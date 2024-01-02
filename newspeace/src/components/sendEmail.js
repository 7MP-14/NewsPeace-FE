import emailjs from 'emailjs-com';
import { useState, useEffect } from 'react';

function EmailButton({ email }) {
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [verificationCode, setVerificationCode] = useState("");
    const [isCodeVerified, setIsCodeVerified] = useState(false);
    const [userInputCode, setUserInputCode] = useState(); // Add state for user input
    const [key, setKey]=useState();
    useEffect(() => {
        setVerificationCode(generateRandomCode());
        setIsCodeVerified(false);
    }, [isEmailSent]);

    const generateRandomCode = () => {
        return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a random 6-digit number
    };

    //1단계 인증 코드 메일로 보내고, 백엔드한테도 보내기
    const  handleCodeVerification= (code) => {
        const templateParams = {
            to_email: email, // Use the provided email prop
            from_name: 'newspeace',
            message: `${code}`,
        };

        emailjs
            .send(
                'newspeace-gmail', // Service ID
                'template_2kvvca7', // Template ID
                templateParams,
                'FxRfQG7F39ix0CjV-', // Your public-key
            )
            .then((response) => {
                console.log('Email sent successfully:', response);
                setIsEmailSent(true);
            })
            .catch((error) => {
                console.error('Failed to send email:', error);
            });

        fetch('/api/send-verify-email/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: window.localStorage.getItem('user_id'),
                verification_code: verificationCode,

            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("처음 메세지",data);
                setIsCodeVerified(data.status);
                setKey(data.key);
            })
            .catch((error) => {
                console.error('Code verification error:', error);
            });
        
    };

    const handleVerification = () => {
        handleCodeVerification(verificationCode);
    };

    //코드 비교하는 함수
    const sendVerificationEmail= () => {
        // Here, you can make a backend request to verify the code
        // and set setIsCodeVerified accordingly.
        // Example:
        fetch('/api/verify-email/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: window.localStorage.getItem('user_id'),
                verification_code: userInputCode, // Use the user input code
                key:key,

            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setIsCodeVerified(data.verify_email);
            })
            .catch((error) => {
                console.error('Code verification error:', error);
            });
        
        // For demonstration purposes, let's set it to true directly.
        setIsCodeVerified(true);
    };

    
    return (
        <div>
            {isEmailSent ? (
                <>
                    
                    {!isCodeVerified ? (
                        <>
                        <p>인증 이메일이 성공적으로 발송되었습니다. 이메일을 확인해주세요!</p>
                            <input
                                type="text"
                                placeholder="인증 코드 입력"
                                value={userInputCode}
                                onChange={(e) => setUserInputCode(e.target.value)}
                            />
                            <button onClick={sendVerificationEmail}>인증하기</button>
                            {/* Add this block to show a message if verification fails */}
                            {userInputCode && isCodeVerified === false && (
                                <p>코드를 다시 입력해주세요.</p>
                            )}
                        </>
                    ) : (
                        <p>확인되었습니다.</p>
                    )}
                </>
            ) : (
                <button onClick={handleVerification}>인증코드받기</button>
            )}
        </div>
    );
}

export default EmailButton;
