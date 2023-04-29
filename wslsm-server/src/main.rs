use std::net::TcpListener;
use std::process::Command;
use std::thread::spawn;
use tungstenite::{accept, Message};

/// A WebSocket echo server
fn main() {
    let server = TcpListener::bind("127.0.0.1:9001").unwrap();
    for stream in server.incoming() {
        spawn(move || {
            let mut websocket = accept(stream.unwrap()).unwrap();
            loop {
                let msg = websocket.read_message().unwrap();
                if msg.is_binary() || msg.is_text() {
                    let output = Command::new("./bin/cpu_usage").output().unwrap();
                    let message =
                        Message::Text(String::from_utf8_lossy(&output.stdout).to_string());
                    websocket.write_message(message).unwrap();
                }
            }
        });
    }
}
