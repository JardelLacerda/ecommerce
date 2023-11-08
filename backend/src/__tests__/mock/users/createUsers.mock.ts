export default {
    scDefaultUser: {
        name: 'User Default',
        email: "user@mail.com",
        password: "1234",
        permission: "user",
    },
    scMerchantUser: {
        name: 'User merchant',
        email: "merchant@mail.com",
        password: "1234",
        permission: "merchant",
    },
    scDefaultUserWithoutPermission:{
        name: 'User Default',
        email: "user@mail.com",
        password: "1234",
    },
    errUserOtherPermission: {
        name: 'User Default',
        email: "user@mail.com",
        password: "1234",
        permission: "Other Value",
    },
    errInvalidBodyRequeridfilds: {
       permission: "user"
    },
    errInvalidBodyInvalidValues: {
        name: 123,
        email: "{}",
        password: "",
        permission: "other"
    },
    inactiveUser: {
        name: 'User Default Inactive',
        email: "userinactive@mail.com",
        password: "1234",
        permission: "user",
    }
}