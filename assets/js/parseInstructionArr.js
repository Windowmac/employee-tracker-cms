const parseInstructionArr = (arr) => {
    return arr.map((str, i) => {
            if(str === 'an' || str === 'a'){
                return '';
            } else 
            if(i > 0){
                const capitalizedStr = str.charAt(0).toUpperCase() + str.slice(1);
                return capitalizedStr;
            } else {
                return str;
            }
        }).join('');
}

module.exports = parseInstructionArr;