const formHelper = () => {
    const loadingForm = document.querySelector(".pb_form_loading")
    if (loadingForm) {
        loadingForm.addEventListener("submit", function(event) {
            event.preventDefault();

            const submitButton = event['submitter'];
            const cancelButton = event['target'].querySelector('button[type="reset"]');

            if (submitButton) {
                let currentClass = submitButton.className;
                let newClass = currentClass.replace("_enabled", "_disabled_loading");

                let cancelClass = cancelButton.className;
                let newCancelClass = cancelClass.replace("_enabled", "_disabled");

                submitButton.disabled = true;
                submitButton.className = newClass;

                if (cancelButton) {
                    cancelButton.disabled = true;
                    cancelButton.className = newCancelClass;
                }

                setTimeout(function() {
                    submitButton.disabled = false;
                    submitButton.className = currentClass;

                    if (cancelButton) {
                        cancelButton.disabled = false;
                        cancelButton.className = cancelClass;
                    }
                }, 5000);
            }

            this.submit();
        });
    }
};

export default formHelper;
