Use <a href='https://haveibeenpwned.com/Passwords'>HaveIBeenPwned's</a> API to check for breached passwords.

As the passphrase is typed, it is checked against more than half a billion breached passwords, to help ensure its not compromised.
Should it fail, the feedback will express the passphrase is too common, prompting the user to change.

This uses their k-Anonymity model, so only the first 5 characters of a hashed copy of the passphrase are sent.

<div class="pb_pill_kit_warning"><div class="pb_title_kit_size_4 pb_pill_text">Disclaimer</div></div>

This example depends on the `zxcvbn` library and `haveibeenpwned` API. 

You can use any library to achieve the same result, this example only intends to show how to add more features to the `Passphrase` kit.
