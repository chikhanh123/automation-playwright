export const loginTestData = [
    {
        case: 'Đăng nhập đúng thông tin',
        username: 'Admin',
        password: 'admin123',
        expectedSuccess: true,
    },
    {
        case: 'Sai password',
        username: 'Admin',
        password: 'sai-mat-khau',
        expectedSuccess: false,
    },
    {
        case: 'Sai username',
        username: 'wrong',
        password: 'admin123',
        expectedSuccess: false,
    },
    {
        case: 'Trống username và password',
        username: '',
        password: '',
        expectedSuccess: false,
    },
];
