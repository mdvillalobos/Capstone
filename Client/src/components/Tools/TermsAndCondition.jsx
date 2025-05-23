const TermsAndCondition = (props) => {
    return (
        <div className="fixed top-0 left-0 z-10 flex items-center justify-center w-screen h-screen overflow-auto bg-black/40 font-Poppins" onClick={props.toggle}>
            <div className="h-[70%] w-[65%] bg-white shadow-lg px-6 py-2 space-y-5 fade-in max-sm:h-[72%] max-sm:w-[85%] overflow-y-scroll"  onClick={(e) => e.stopPropagation()}>
            <button type="button" className="fixed  right-2 top-2 px-2 rounded-full hover:bg-[#eae7e7] text-[#3b3c3c] text-3xl duration-200" onClick={props.toggle}>
                &times;
            </button> 
            <h1>Terms & Condition</h1>
            <p>Last Updated: October 21, 2024</p>
            <p>
                Welcome to National University Faculty Service Office. These Terms and Conditions govern your use of our website and services. 
                By accessing or using our site, you agree to comply with these terms. If you do not agree, please do not use our services.
            </p>

            <p>
                1. Acceptance of Terms<br/>
                By accessing or using our services, you agree to these Terms and Conditions and our Privacy Policy.
            </p>
            <p>
                2. Changes to Terms<br/>
                We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting on our site. Your continued use of the services constitutes your acceptance of the modified terms.
            </p>
            <p>
                3. Eligibility<br/>
                You must be at least 18 years old to use our services. By using our site, you represent and warrant that you meet this requirement.
            </p>
            <p>
                4. User Accounts<br/>
                To access certain features, you may need to create an account. You agree to provide accurate and complete information during registration and to update it as necessary. You are responsible for maintaining the confidentiality of your account and password.
            </p>
            <p>
                5. Use of Services<br/>
                You agree to use our services only for lawful purposes and in a way that does not infringe on the rights of others or restrict their use of the services.
            </p>
            <p>
                6. Intellectual Property<br/>
                All content, trademarks, and other intellectual property on our site are owned by National University Faculty Service Office or our licensors. You may not use, reproduce, or distribute any content without our prior written permission.
            </p>
            <p>
                7. Limitation of Liability<br/>
                To the fullest extent permitted by law, National University Faculty Service Office shall not be liable for any indirect, incidental, or consequential damages arising out of your use of our services.
            </p>
            <p>
                8. Indemnification<br/>
                You agree to indemnify and hold harmless National University Faculty Service Office from any claims, losses, damages, or expenses (including legal fees) arising out of your use of our services or violation of these Terms.
            </p>
            <p>
                9. Governing Law<br/>
                These Terms shall be governed by and construed in accordance with the laws of Philippines. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts located in Manila.
            </p>
            <p>
                10. Contact Information<br/>
                If you have any questions about these Terms, please contact us at Nufso@gmail.com.
            </p>

            </div>
        </div>
    )
}


export default TermsAndCondition
