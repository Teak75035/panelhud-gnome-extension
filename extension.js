import GObject from 'gi://GObject';
import St from 'gi://St';
import Gio from 'gi://Gio';
import GLib from 'gi://GLib';
import Clutter from 'gi://Clutter';

import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';

const Indicator = GObject.registerClass(
class Indicator extends PanelMenu.Button {

    _init(settings) {
        super._init(0.0, 'PanelHUD');

        this._settings = settings;

        this.label = new St.Label({
            text: settings.get_string('note'),
            y_align: Clutter.ActorAlign.CENTER,
            y_expand: true
        });

        this.add_child(this.label);

        settings.connect('changed::note', () => {
            this.label.text = settings.get_string('note');
        });
    }
});

export default class PanelHUDExtension extends Extension {

    enable() {

        this._settings = new Gio.Settings({
            schema_id: 'org.gnome.shell.extensions.panelhud'
        });

        this._indicator = new Indicator(this._settings);

        Main.panel.addToStatusArea(this.uuid, this._indicator);

        this._startServer();
    }

    disable() {

        if (this._indicator)
            this._indicator.destroy();

        this._stopServer();
    }

    _startServer() {

        let serverPath = GLib.build_filenamev([
            this.path,
            'panelhud_server.py'
        ]);

        try {

            this._proc = Gio.Subprocess.new(
                ['python3', serverPath],
                Gio.SubprocessFlags.NONE
            );

            log('PanelHUD server started');

        } catch (e) {

            log('PanelHUD server failed: ' + e);

        }
    }

    _stopServer() {

        if (this._proc) {

            try {

                this._proc.force_exit();

            } catch (e) {}

            this._proc = null;

            log('PanelHUD server stopped');
        }
    }
}
