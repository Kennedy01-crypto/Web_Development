import imaplib
import email
import os
import re
import time
from datetime import datetime

# Email accounts list (server, email, password)
EMAIL_ACCOUNTS = [
    {"server": "mail.privateemail.com", "port": 993, "email": "pa@rodrigolanda.net", "password": "1267pudin"}, 
   ]

# Output directory
OUTPUT_DIR = "C:/Emails"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Get today's date in IMAP format
today_date = datetime.today().strftime("%d-%b-%Y")

# Function to remove links to images, buttons, etc. from email body
def clean_email_body(body):
    # Remove URLs (including image sources and buttons)
    body = re.sub(r'http[s]?://\S+', '', body)
    body = re.sub(r'www\.\S+', '', body)
    body = re.sub(r'cid:[^\s]+', '', body)  # Handle cid: links (embedded content)
    return body

# Open output file
output_file_path = os.path.join(OUTPUT_DIR, f"DailyEmails_{datetime.today().strftime('%Y%m%d')}.txt")
with open(output_file_path, "w", encoding="utf-8") as output_file:
    
    # Loop through each email account
    for account in EMAIL_ACCOUNTS:
        try:
            print(f"Connecting to {account['email']}...")

            # Connect to IMAP server
            mail = imaplib.IMAP4_SSL(account["server"], account["port"])
            mail.login(account["email"], account["password"])
            mail.select("INBOX")
            time.sleep(2)  # Pause for stability

            # Search for today's emails
            status, email_ids = mail.search(None, 'UNSEEN')
            time.sleep(2)  # Pause for stability

            if status == "OK":
                print(f"Found {len(email_ids[0].split())} unseen emails for {account['email']}")
                for email_id in email_ids[0].split():
                    status, msg_data = mail.fetch(email_id, "(RFC822)")
                    if status == "OK":
                        for response_part in msg_data:
                            if isinstance(response_part, tuple):
                                # Parse email content
                                msg = email.message_from_bytes(response_part[1])
                                subject = msg["Subject"] or "No Subject"
                                sender = msg["From"] or "Unknown Sender"
                                received_time = msg["Date"] or "Unknown Date"

                                # Get plaintext email body (only text/plain, no HTML)
                                body = ""
                                if msg.is_multipart():
                                    for part in msg.walk():
                                        # If it's plaintext, extract the body
                                        if part.get_content_type() == "text/plain":
                                            body = part.get_payload(decode=True).decode(errors="ignore")
                                            break  # Only take the first text/plain part
                                        # Skip other content types (e.g., text/html)
                                else:
                                    # If the message is not multipart, just decode the payload as plain text
                                    body = msg.get_payload(decode=True).decode(errors="ignore")

                                # Clean the body from links
                                body = clean_email_body(body)

                                # Format email data with a clear separation using backslashes
                                email_text = f"\n\n{'\\' * 5}\nEmail from: {sender}\nSubject: {subject}\nReceived: {received_time}\n{'\\' * 5}\n\n{body}\n{'\\' * 5}\n"
                                output_file.write(email_text)
            else:
                print(f"Failed to fetch emails for {account['email']}")

            # Logout
            mail.logout()
            time.sleep(2)  # Pause after logout

        except Exception as e:
            print(f"Error fetching emails for {account['email']}: {str(e)}")

print(f"Emails saved to {output_file_path}")
