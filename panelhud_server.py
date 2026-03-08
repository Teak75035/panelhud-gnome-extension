#!/usr/bin/env python3

from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse, parse_qs
import subprocess

HOST = "127.0.0.1"
PORT = 1234

SCHEMA = "org.gnome.shell.extensions.panelhud"
KEY = "note"


def set_note(text):

    subprocess.run([
        "gsettings",
        "set",
        SCHEMA,
        KEY,
        f"'{text}'"
    ])


class Handler(BaseHTTPRequestHandler):

    def do_GET(self):

        parsed = urlparse(self.path)

        params = parse_qs(parsed.query)

        if "ctt" in params:

            set_note(params["ctt"][0])

        self.send_response(200)
        self.end_headers()
        self.wfile.write(b"OK")


def main():

    server = HTTPServer((HOST, PORT), Handler)

    print("panelhud server started")

    server.serve_forever()


if __name__ == "__main__":
    main()
