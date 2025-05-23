
const PrivacyAndPolicy = (props) => {
    return (
        <div className="fixed top-0 left-0 z-10 flex items-center justify-center w-screen h-screen overflow-auto bg-black/40 font-Poppins"  onClick={props.toggle}>
            <div className="h-[70%] w-[65%] bg-white shadow-lg px-6 py-2 space-y-5 fade-in max-sm:h-[72%] max-sm:w-[85%] overflow-y-scroll" onClick={(e) => e.stopPropagation()}>
                <button type="button" className="absolute right-2 top-2 px-2 rounded-full hover:bg-[#eae7e7] text-[#3b3c3c] text-3xl duration-200" onClick={props.toggle}>
                    &times;
                </button> 
                <h1>User Agreement for Nufso</h1>
                <p>Last Updated: [October,2024]</p>
                <p>Welcome to Nufso! By accessing or using our website, you agree to comply with and be bound by the following terms and conditions. Please read them carefully.</p> 
                <p>1. Acceptance of Terms By accessing or using [https://nufso.onrender.com], you agree to these Terms of Service. If you do not agree, please do not use our website. </p>
                <p>2. Changes to Terms We may modify these terms from time to time. Any changes will be effective upon posting on this page with an updated effective date. Your continued use of the site after changes constitutes your acceptance of the new terms.</p> 
                <p>3. User Accounts Eligibility: You must be at least 18 years old to create an account. By creating an account, you represent that you meet this requirement. Account Security: You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.</p> 
                <p>4. User Conduct You agree not to: Use the website for any unlawful purpose. Harass, threaten, or intimidate other users. Upload any content that is offensive, obscene, or violates any intellectual property rights.</p> 
                <p>5. Intellectual Property All content on Nufso, including text, graphics, logos, and software, is the property of Group Rivalry or its licensors and is protected by copyright, trademark, and other laws. </p>
                <p>6. User Content You retain ownership of any content you submit, post, or display on or through the website. By submitting content, you grant Group Rivalry a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and publish that content.</p> 
                <p>7. Third-Party Links Our website may contain links to third-party websites. We do not endorse or assume any responsibility for the content or practices of these sites. Use them at your own risk. </p>
                <p>8. Disclaimer of Warranties The website is provided on an "as-is" and "as-available" basis. We make no warranties, express or implied, regarding the operation or availability of the site.</p> 
                <p>9. Limitation of Liability To the fullest extent permitted by law, Group Rivalry shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the website.</p> 
                <p>10. Governing Law This agreement shall be governed by the laws of Philippines. Any disputes arising from this agreement will be handled in the courts of Manila, Philippines.</p> 
                <p>11. Contact Information If you have any questions about these terms, please contact us at Nufso@gmail.com</p>
            </div>
        </div>
    )
}

export default PrivacyAndPolicy
