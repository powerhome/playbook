const formHelper = () => {
    const loadingForm = document.querySelector(".pb_form_loading")
    if (loadingForm) {
        loadingForm.addEventListener("submit", function(event) {
            const submitButton = event['submitter'];
            const cancelButton = event['target'].querySelector('button[type="reset"]');

            if (submitButton) {
                let currentClass = submitButton.className;
                let newClass = currentClass.replace("pb_button_enabled", "pb_button_disabled pb_button_loading");

                let cancelClass = cancelButton ? cancelButton.className : "";
                let newCancelClass = cancelClass.replace("_enabled", "_disabled");

                submitButton.disabled = true;
                submitButton.className = newClass;

                if (cancelButton) {
                    cancelButton.disabled = true;
                    cancelButton.className = newCancelClass;
                }
            }
        });
    }
};

export default formHelper;
