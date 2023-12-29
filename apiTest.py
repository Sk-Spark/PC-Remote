import socket

# Server address
server_address = ('localhost', 20001)

# Create a socket object
client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# Connect to the server
client_socket.connect(server_address)
print("Connected to the server")

try:
    # Example commands to test the server
    commands = [
        "0,50,50",  # Move mouse to (50, 50)
        "1,1",      # Left click
        "2,enter",  # Press Enter key
        "3,Hello",  # Type "Hello"
        "4",        # Take and send screenshot
        "5",        # Break the loop (stop the server)
    ]

    for command in commands:
        # Send the command to the server
        client_socket.sendall(command.encode('utf-8'))

        # Receive response if necessary (e.g., for screenshot command)
        if command.startswith("4"):
            # Receive the screenshot data
            screenshot_data = client_socket.recv(4096)

            # Process or save the screenshot data as needed
            # For example, you can save it to a file:
            with open('screenshot.png', 'wb') as f:
                f.write(screenshot_data)

finally:
    # Close the socket connection
    client_socket.close()
    print("Connection closed")
