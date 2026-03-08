# panelhud-gnome-extension
Displays text on the panel that can be changed by HTTP GET.
![Sample image](https://github.com/Teak75035/panelhud-gnome-extension/blob/main/sample.png?raw=true)

# Install
You can easily install this extension. (Using Ubuntu as an example)

- Clone the repository
```
git clone https://github.com/Teak75035/panelhud-gnome-extension.git
```
- Compile schema
```
cp ./panelhud.gschema.xml ~/.local/share/glib-2.0/schemas/
glib-compile-schemas ~/.local/share/glib-2.0/schemas/
```
- Reload GNOME
  Alt + F2, then r (log out for wayland)
- Check
  Check if extensions are enabled in GNOME Extensions.

# Usage
Change the text via HTTP `http://127.0.0.1:1234?ctt=`

# Bug
You tell me via issue. (I tried it with no problems)

# Special Thanks
- Panel Note [https://github.com/GittyMac/PanelNote]
