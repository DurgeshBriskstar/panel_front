import axios from './axios';

// ----------------------------------------------------------------------

// get IP address
const myIp = async () => {
    try {
        const res = await axios.get('/api/geolocation');
        return Promise.resolve(res);
    } catch (error) {
        return Promise.reject(error);
    }
};

// get browser name
const browserName = () => {
    let name = null;
    if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) !== -1) {
        name = 'Opera';
    }
    else if (navigator.userAgent.indexOf("Edg") !== -1) {
        name = 'Edge';
    }
    else if (navigator.userAgent.indexOf("Chrome") !== -1) {
        name = 'Chrome';
    }
    else if (navigator.userAgent.indexOf("Safari") !== -1) {
        name = 'Safari';
    }
    else if (navigator.userAgent.indexOf("Firefox") !== -1) {
        name = 'Firefox';
    }
    else if ((navigator.userAgent.indexOf("MSIE") !== -1) || (!!document.documentMode === true)) {
        name = 'IE';
    }
    return name;
}

// get browser version
const browserVersion = () => {
    let version = null;
    let verOffset = null;
    let ix = null;

    if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) !== -1) {
        verOffset = navigator.userAgent.indexOf("Opera");
        version = navigator.userAgent.substring(verOffset + 6);
        if (navigator.userAgent.indexOf("Version") !== -1) {
            verOffset = navigator.userAgent.indexOf("Version");
            version = navigator.userAgent.substring(verOffset + 6);
        }
    }
    else if (navigator.userAgent.indexOf("Edg") !== -1) {
        verOffset = navigator.userAgent.indexOf("Edg");
        version = navigator.userAgent.substring(verOffset + 4);
    }
    else if (navigator.userAgent.indexOf("Chrome") !== -1) {
        verOffset = navigator.userAgent.indexOf("Chrome");
        version = navigator.userAgent.substring(verOffset + 7);
    }
    else if (navigator.userAgent.indexOf("Safari") !== -1) {
        verOffset = navigator.userAgent.indexOf("Safari");
        version = navigator.userAgent.substring(verOffset + 7);
        if (navigator.userAgent.indexOf("Version") !== -1) {
            verOffset = navigator.userAgent.indexOf("Version");
            version = navigator.userAgent.substring(verOffset + 8);
        }
    }
    else if (navigator.userAgent.indexOf("Firefox") !== -1) {
        verOffset = navigator.userAgent.indexOf("Firefox");
        version = navigator.userAgent.substring(verOffset + 8);
    }
    else if ((navigator.userAgent.indexOf("MSIE") !== -1) || (!!document.documentMode === true)) {
        version = parseFloat(navigator.appVersion);
    }

    if (version.indexOf(";") !== -1) {
        ix = version.indexOf(";");
        version = version.substring(0, ix);
    }
    if (version.indexOf(" ") !== -1) {
        ix = version.indexOf(" ");
        version = version.substring(0, ix);
    }

    return version;
}

// get browser information
const myBrowser = async () => {
    const operatingSytem = ['Windows', 'Linux', 'Mac'];
    let ipAdd = null;
    await myIp().then(originalPromiseResult => {
        ipAdd = originalPromiseResult.IPv4;
    });

    const browser = {
        ip: ipAdd,
        name: browserName(),
        version: browserVersion(),
        os: operatingSytem.find(v => navigator.appVersion.indexOf(v) >= 0)
    };

    return Promise.resolve(browser);
};

export { myIp, myBrowser };