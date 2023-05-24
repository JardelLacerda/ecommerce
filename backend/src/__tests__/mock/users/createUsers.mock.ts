export default {
    scDefaultUser: {
        name: 'User Default',
        email: "user@mail.com",
        passowrd: "1234",
        permission: "user",
    },
    scMerchantUser: {
        name: 'User merchant',
        email: "merchant@mail.com",
        passowrd: "1234",
        permission: "merchant",
    },
    scDefaultUserWithoutPermission:{
        name: 'User Default',
        email: "user@mail.com",
        passowrd: "1234",
    },
    errUserOtherPermission: {
        name: 'User Default',
        email: "user@mail.com",
        passowrd: "1234",
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
}