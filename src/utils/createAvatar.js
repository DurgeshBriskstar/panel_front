// ----------------------------------------------------------------------


const PRIMARY_NAME = ['A', 'N', 'H', 'L', 'Q', '9', '8'];
const INFO_NAME = ['F', 'G', 'T', 'I', 'J', '1', '2', '3'];
const SUCCESS_NAME = ['K', 'D', 'Y', 'B', 'O', '4', '5'];
const WARNING_NAME = ['P', 'E', 'R', 'S', 'C', 'U', '6', '7'];
const ERROR_NAME = ['V', 'W', 'X', 'M', 'Z'];

// create a function to get the first character of the name
function getFirstCharacter(name) {
    const nameArr = name.split(' ');
    let avtarName = '';
    if(nameArr.length > 1) {
        avtarName = `${nameArr[0].charAt(0).toUpperCase()}${nameArr[1].charAt(0).toUpperCase()}`
    }else if(nameArr.length === 1) {
        avtarName = `${nameArr[0].charAt(0).toUpperCase()}${nameArr[0].charAt(1).toUpperCase()}`
    }
    return avtarName;
}

// create a function to get the color of the name
function getAvatarColor(name) {
    if(name !== null) {
        if (PRIMARY_NAME.includes(getFirstCharacter(name.charAt(0).toUpperCase()))) return 'primary';
        if (INFO_NAME.includes(getFirstCharacter(name.charAt(0).toUpperCase()))) return 'info';
        if (SUCCESS_NAME.includes(getFirstCharacter(name.charAt(0).toUpperCase()))) return 'success';
        if (WARNING_NAME.includes(getFirstCharacter(name.charAt(0).toUpperCase()))) return 'warning';
        if (ERROR_NAME.includes(getFirstCharacter(name.charAt(0).toUpperCase()))) return 'error';
        return 'default';
    }
    return 'default';
}

export default function createAvatar(firstName = null, lastName = null) {
    let fullName = null;
    if((firstName !== null || firstName !== '') && (lastName !== null || lastName !== '')) {
        fullName = `${firstName} ${lastName}`;
    }else if(firstName === null || firstName === '') {
        fullName = lastName;
    }else if(lastName === null || lastName === '') {
        fullName = firstName;
    }   
    
    return {
        name: getFirstCharacter(fullName),
        color: getAvatarColor(fullName),
    };
}
