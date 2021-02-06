const donate = function () {
    const checkCurrent = document.querySelector('.check-current');
    const surely = document.querySelectorAll('[data-required]');
    const checkbox = document.querySelectorAll('.checkbox');
    const checkError = document.querySelector('.checkError');
    const messageError = 'К сожалению мы не можем принять пожертвование без Вашего согласия с договором';

    if(checkCurrent){
        checkCurrent.addEventListener('input', () => {
            checkCurrent.value = checkCurrent.value.replace(/\D/, '');
        });
    }

    if(surely){
        surely.forEach(item => {
            item.previousElementSibling.insertAdjacentHTML('afterend', '<b style="color: #dc143c;">&nbsp;*</b>');
        });
    }

    document.addEventListener('focusout', (ev) => {
        const target = ev.target;

        if(target && target.matches('[data-required]')){
            if(!target.value){
                target.style.borderColor = '#dc143c';
            } else {
                target.removeAttribute('style');
            }
        }
    });

    document.addEventListener('click', (ev) =>{
        const target = ev.target;

        if(target && target.classList.contains('btn')){
            ok();
        }

        if(target && target.matches('input[name=price]') ){
            if(checkCurrent){
                checkCurrent.value = '';
                if(checkCurrent.hasAttribute('class')){
                    _removeAtr(checkCurrent, 'errorBlock');
                }
                checkCurrent.value = target.nextElementSibling.textContent;
            }
        }

        if(target && target.matches('.check-current') ){
            if(target.hasAttribute('class')){
                _removeAtr(target, 'errorBlock');
            }
            target.value = target.nextElementSibling.textContent;
        }

    });

    document.addEventListener('change', (ev) => {
        const target = ev.target;

        if(target && target.classList.contains('checkbox')){
            if(!target.checked){
                checkError.innerHTML = messageError;
            } else {
                checkError.innerHTML = '';
            }
        }
    });

    function ok() {
        let error = true;

        if(!checkCurrent.value) {
            error = false;
            checkCurrent.classList.add('errorBlock');
            checkCurrent.nextElementSibling.classList.add('errorMessage');
            checkCurrent.nextElementSibling.textContent = 'Введите корректную сумму';
        }

        surely.forEach(item => {
            if(!item.value){
                item.style.borderColor = '#dc143c';
                error = false;
            }
        });

        checkbox.forEach(item => {
            if(!item.checked){
                checkError.innerHTML = messageError;
                error = false
            }
        });

        if(!error){
            return;
        }

        info();

    }

    function _removeAtr(elem, className) {
        elem.classList.remove(className);
        elem.nextElementSibling.textContent = '';
        elem.removeAttribute('placeholder');
    }

    function info(){
        const infoForm = {
            mani : document.querySelector('.check-current').value,
            name : document.querySelector('input[name=name]').value,
            surName : document.querySelector('input[name=surname]').value,
            email : document.querySelector('input[name=email]').value,
            tel : document.querySelector('input[name=tel]').value,
            message : document.querySelector('textarea[name=message]').value,
        };
        if(document.querySelector('[data-current]').checked){
            infoForm.current = 'Подписка';
        } else {
            infoForm.current = 'Разовый платеж';
        }
        for(let key in infoForm){
            console.log(`${key}: ${infoForm[key]}`);
        }

        document.querySelector('.check-current').value = '';
        document.querySelector('input[name=name]').value = '';
        document.querySelector('input[name=surname]').value = '';
        document.querySelector('input[name=email]').value = '';
        document.querySelector('input[name=tel]').value = '';
        document.querySelector('textarea[name=message]').value = '';
    }


};


export default donate;
