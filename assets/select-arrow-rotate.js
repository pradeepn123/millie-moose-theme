document.addEventListener('DOMContentLoaded', function () {
    const selectWrapper = document.querySelector('.select-wrapper');
    const selectElement = selectWrapper.querySelector('select');

    // Add event listeners to toggle the .open class
    selectElement.addEventListener('focus', function () {
        selectWrapper.classList.add('open');
    });

    selectElement.addEventListener('blur', function () {
        selectWrapper.classList.remove('open');
    });

    // Optionally, handle click for better UX on some browsers
    selectElement.addEventListener('click', function () {
        if (selectWrapper.classList.contains('open')) {
            selectWrapper.classList.remove('open');
        } else {
            selectWrapper.classList.add('open');
        }
    });
});
