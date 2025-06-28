import { useState } from 'react';
import Input from './Input';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function PasswordInput(props) {
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="relative">
            <Input {...props} type={showPassword ? 'text' : 'password'} />
            <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-8.5 cursor-pointer"
            >
                {showPassword ? (
                    <Visibility className="text-gray-700" />
                ) : (
                    <VisibilityOff className="text-gray-700" />
                )}
            </button>
        </div>
    );
}
