import { DEFAULT_DATE } from './config';
// utils
import { fDate } from './utils/formatTime';

export const PATTERN = {
    alpha: {
        value: /^[a-zA-Z\s]+$/,
        message: 'Only alphabets are allowed for this field'
    },
    alphaNumeric: {
        value: /^[a-zA-Z0-9\s]+$/,
        message: 'Only alphanumeric are allowed for this field'
    },
    alphaSymbol: {
        value: /^[a-zA-Z-'_.\u00C0-\u024F\u1E00-\u1EFF\s]+$/,
        message: 'Only alphabets are allowed for this field'
    },
    alphaNumericSymbol: {
        value: /^[a-zA-Z0-9-,'_.\u00C0-\u024F\u1E00-\u1EFF\s]+$/,
        message: 'Only alphanumeric are allowed for this field'
    },
    numeric: {
        value: /^[0-9]+$/,
        message: 'Only numbers are allowed for this field'
    },
};

export const ADDRESS_VALIDATION_RULES = {
    streetRule: {
        pattern: {
            value: PATTERN.alphaNumericSymbol.value,
            message: PATTERN.alphaNumericSymbol.message
        },
        max: {
            value: '',
            message: ''
        },
        min: {
            value: '6',
            message: 'must be more then or equal to 6 characters'
        },
        required: {
            value: false,
            message: 'is required'
        }
    },
    postalCodeRule: {
        pattern: {
            value: PATTERN.alphaNumeric.value,
            message: PATTERN.alphaNumeric.message
        },
        max: {
            value: '',
            message: ''
        },
        min: {
            value: '3',
            message: 'must be more then or equal to 3 characters'
        },
        required: {
            value: false,
            message: 'is required'
        }
    },
    cityRule: {
        pattern: {
            value: PATTERN.alphaNumericSymbol.value,
            message: PATTERN.alphaNumericSymbol.message
        },
        max: {
            value: '',
            message: ''
        },
        min: {
            value: '2',
            message: 'must be more then or equal to 2 characters'
        },
        required: {
            value: false,
            message: 'is required'
        }
    },
    countryRule: {
        pattern: {
            value: '',
            message: ''
        },
        max: {
            value: '',
            message: ''
        },
        min: {
            value: '',
            message: ''
        },
        required: {
            value: false,
            message: 'is required'
        }
    },
    stateRule: {
        pattern: {
            value: '',
            message: ''
        },
        max: {
            value: '',
            message: ''
        },
        min: {
            value: '',
            message: ''
        },
        required: {
            value: false,
            message: 'is required'
        }
    },
}

export const PEOPLE_VALIDATION_RULES = {
    nameRule: {
        pattern: {
            value: PATTERN.alphaNumericSymbol.value,
            message: PATTERN.alphaNumericSymbol.message
        },
        max: {
            value: '50',
            message: 'must be less then or equal to 50 characters'
        },
        min: {
            value: '3',
            message: 'must be more then or equal to 3 characters'
        },
        required: true
    },
    emailRule: {
        pattern: {
            value: '',
            message: 'email must be a valid email'
        },
        max: {
            value: '',
            message: 'must be less then or equal to 50 characters'
        },
        min: {
            value: '',
            message: 'must be more then or equal to 3 characters'
        },
        required: true
    },
    phoneRule: {
        pattern: {
            value: '',
            message: 'Contact no. must be a valid number'
        },
        max: {
            value: '14',
            message: 'must be less then or equal to 14 characters'
        },
        min: {
            value: '8',
            message: 'must be more then or equal to 8 characters'
        },
        required: true
    },
    dateRule: {
        pattern: {
            value: '',
            message: ''
        },
        max: {
            value: new Date(DEFAULT_DATE),
            message: `should be equal or earlier than ${fDate(DEFAULT_DATE)}`
        },
        min: {
            value: '',
            message: ''
        },
        required: true
    },
    lastNameRule: {
        pattern: {
            value: PATTERN.alphaNumericSymbol.value,
            message: PATTERN.alphaNumericSymbol.message
        },
        max: {
            value: '50',
            message: 'must be less then or equal to 50 characters'
        },
        min: {
            value: '3',
            message: 'must be more then or equal to 3 characters'
        },
        required: {
            value: false,
            message: 'is required'
        }
    },
}

export const SERVICE_VALIDATION_RULES = {
    nameRule: {
        pattern: {
            value: PATTERN.alphaNumericSymbol.value,
            message: PATTERN.alphaNumericSymbol.message
        },
        max: {
            value: '50',
            message: 'must be less then or equal to 50 characters'
        },
        min: {
            value: '3',
            message: 'must be more then or equal to 3 characters'
        },
        required: {
            value: true,
            message: 'is required'
        }
    },
    priceRule: {
        pattern: {
            value: PATTERN.numeric.value,
            message: PATTERN.numeric.message
        },
        max: {
            value: '6',
            message: 'must be less than or equal then 6 characters'
        },
        min: {
            value: '',
            message: ''
        },
        required: {
            value: true,
            message: 'is required'
        },
    }
}

export const REVIEW_SETTING_VALIDATION_RULES = {
    emailRule: {
        required: {
            value: false,
            message: 'is required'
        }
    },
    linkRule: {
        required: {
            value: false,
            message: 'is required'
        }
    },
    nameRule: {
        pattern: {
            value: PATTERN.alphaNumericSymbol.value,
            message: PATTERN.alphaNumericSymbol.message
        },
        max: {
            value: '50',
            message: 'must be less then or equal to 50 characters'
        },
        min: {
            value: '3',
            message: 'must be more then or equal to 3 characters'
        },
        required: {
            value: false,
            message: 'is required'
        }
    },
}

export const AGENCY_LOCATION_VALIDATION_RULES = {
    linkRule: {
        required: {
            value: false,
            message: 'is required'
        }
    },
    nameRule: {
        pattern: {
            value: PATTERN.alphaNumericSymbol.value,
            message: PATTERN.alphaNumericSymbol.message
        },
        max: {
            value: '50',
            message: 'must be less then or equal to 50 characters'
        },
        min: {
            value: '3',
            message: 'must be more then or equal to 3 characters'
        },
        required: {
            value: false,
            message: 'is required'
        }
    },
}

export const CHILD_VALIDATION_RULES = {
    childNameRule: {
        pattern: {
            value: PATTERN.alphaNumericSymbol.value,
            message: PATTERN.alphaNumericSymbol.message
        },
        max: {
            value: '50',
            message: 'must be less then or equal to 50 characters'
        },
        min: {
            value: '3',
            message: 'must be more then or equal to 3 characters'
        },
        required: true
    },
    ageRule:{
        pattern: {
            value: PATTERN.numeric.value,
            message: PATTERN.numeric.message
        },
        max: {
            value: '3',
            message: 'must be less than or equal then 3 characters'
        },
        min: {
            value: '',
            message: ''
        },
        required: {
            value: false,
            message: 'is required'
        }
    }
}
