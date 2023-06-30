import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {

  ngOnInit() {
    const inputs = Array.from(document.querySelectorAll("input")) as HTMLInputElement[];
    const button = document.querySelector("button");

    if (!button) {
      return; // If the button is null, exit the function
    }

    // iterate over all inputs
    inputs.forEach((input, index1) => {
      input.addEventListener("keyup", (e) => {
        // This code gets the current input element and stores it in the currentInput variable
        // This code gets the next sibling element of the current input element and stores it in the nextInput variable
        // This code gets the previous sibling element of the current input element and stores it in the prevInput variable
        const currentInput = input,
          nextInput = input.nextElementSibling as HTMLInputElement,
          prevInput = input.previousElementSibling as HTMLInputElement;

        // if the value has more than one character then clear it
        if (currentInput.value.length > 1) {
          currentInput.value = "";
          return;
        }
        // if the next input is disabled and the current value is not empty
        // enable the next input and focus on it
        if (nextInput && nextInput.hasAttribute("disabled") && currentInput.value !== "") {
          nextInput.removeAttribute("disabled");
          nextInput.focus();
        }

        // if the backspace key is pressed
        if (e.key === "Backspace") {
          // iterate over all inputs again
          inputs.forEach((input, index2) => {
            // if the index1 of the current input is less than or equal to the index2 of the input in the outer loop
            // and the previous element exists, set the disabled attribute on the input and focus on the previous element
            if (index1 <= index2 && prevInput) {
              input.setAttribute("disabled", "true");
              input.value = "";
              prevInput.focus();
            }
          });
        }
        // if all input fields are filled and do not have the disabled attribute
        // add the active class to the button; otherwise, remove the active class.
        const isAllFieldsFilled = inputs.every((input) => input.value !== "");
        if (isAllFieldsFilled) {
          button.classList.add("active");
        } else {
          button.classList.remove("active");
        }
      });
    });

    // focus the first input (which index is 0) on window load
    window.addEventListener("load", () => inputs[0].focus());
  }

}
