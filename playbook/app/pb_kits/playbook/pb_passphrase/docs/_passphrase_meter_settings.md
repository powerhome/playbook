This example shows how to enhance the passphrase strenght by setting diferent tresholds and lengths. 

The `meterSettings` array contains different settings for each rendered input. The `handleStrengthCalculation` handles the strength calculation using those settings, showing different results for the same `passphrase` input.

By default, `minLength` is 12. Try typing any value in the `Default Example` input. Notice that the bar won't change from red until the minimum is met.

Adjust these props to tune the sensitivity of the bar.

Note: minimum length trumps strength and will set the bar to a red color, despite whatever strength is calculated.

<div class="pb_pill_kit_warning"><div class="pb_title_kit_size_4 pb_pill_text">Disclaimer</div></div>

This example depends on the `zxcvbn` library. 

You can use any library to achieve the same result, this example only intends to show how to add more features to the `Passphrase` kit.
