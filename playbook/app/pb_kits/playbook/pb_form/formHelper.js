const formHelper = () => {
    const loadingForm = document.querySelector(".pb_form_loading")
    if (loadingForm) {
        loadingForm.addEventListener("submit", function(event) {
            event.preventDefault();

            const submitButton = event['submitter'];

            if (submitButton) {
                let currentClass = submitButton.className;
                let newClass = currentClass.replace("_enabled", "_disabled_loading");

                submitButton.disabled = true;
                submitButton.className = newClass;

                setTimeout(function() {
                    submitButton.disabled = false;
                    submitButton.className = currentClass;
                }, 5000);
            }

            this.submit();
        });
    }
};

export default formHelper;
