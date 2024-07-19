# Phone Dialer Application

## Introduction

This Phone Dialer Application is a web-based simulation of a phone dialer and calling interface. It provides a realistic user experience for dialing numbers, making calls, and handling incoming calls.

## Features

### Home Screen (Dial Pad)

-   Interactive dial pad for inputting phone numbers
-   Keyboard support for number input
-   Call button activation logic:
    -   Activates when at least 6 digits are entered
    -   Displays a modal for invalid numbers (less than 6 digits or has characters other then numbers)
-   Initiates call when the call button is pressed

### Calling Screen

-   Displays contact details and "Calling..." status for the first 2 seconds
-   Shows call duration after the initial 2-second connection period
-   Interactive call control buttons:
    -   Keyboard button to reveal number pad for in-call digit input
    -   Mute button to toggle audio muting
    -   Speaker button to toggle speakerphone
-   End call button to terminate the call and return to the Dialer screen

### Incoming Call Screen

-   Accessible via a call button at the bottom of the screen (for demo purposes)
-   Presents options to accept or reject the incoming call
-   Call handling:
    -   Accepting the call redirects to the Outgoing Call screen
    -   Rejecting the call returns the user to the Dialer screen

### Messaging Screen

-   Access by clicking on message button in footer
-   **Header Area:** Displays the title "New Message" and a back button.
-   **Sender Information:** Input field for specifying the sender's email address.
-   **Recipient Tags:** Tag input field for adding and removing recipient tags.
-   **Message Input:** Text area for composing the message, with support for line breaks.
-   **Keyboard Interaction:** A virtual keyboard that supports typing, deleting, and special characters.

#### How It Works

1.  Header Area:

    -   Displays a back button and the "New Message" title.

2.  Sender Information:

    -   Users can input the sender's address in the Send from: field.

3.  Recipient Tags:

    -   Users can add recipient tags by typing and pressing Enter.
    -   Tags can be removed by clicking the "X" button next to each tag.

4.  Message Input:

    -   Users can type a message, including new lines by pressing Enter.

5.  Virtual Keyboard:
    -   Displays when an input field is focused.
    -   Allows users to type, delete characters, insert spaces, and press Enter.

## Installation

1. Clone the repository:

    ```
    git clone https://github.com/Sagarworkhub/phone-dailer.git
    ```

2. Navigate to the project directory:

    ```
    cd phone-dialer
    ```

3. Install dependencies:

    ```
    npm install
    ```

4. Start the development server:

    ```
    npm dev
    ```

5. Open your browser and visit `http://localhost:5173` to view the application.

## Usage

1. **Dialing a Number**:

    - Use the on-screen dial pad or your keyboard to input a phone number.
    - The call button will activate once you've entered at least 6 digits.
    - Click the call button to initiate the call.

2. **During a Call**:

    - Use the mute button to toggle your microphone on/off.
    - Use the speaker button to toggle speakerphone mode.
    - Press the keyboard button to bring up the dial pad for inputting digits during the call.
    - Press the end call button to terminate the call and return to the dial pad.

3. **Receiving a Call**:
    - Click the call button at the bottom of the screen to simulate an incoming call.
    - Choose to either accept or reject the call.
