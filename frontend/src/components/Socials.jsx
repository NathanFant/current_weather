import { FaGithub, FaLinkedin, FaDiscord } from "react-icons/fa";

export default function Socials() {
    return (
        <div className="info-box glass-card floating-box">
            <span>Created by Nathan Fant</span>
            <a href="https://github.com/NathanFant" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <FaGithub size={20} />
            </a>
            <a href="https://www.linkedin.com/in/nathan-fant-a28405250/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedin size={20} />
            </a>
            <a href="https://discord.gg/sH9PwcX5TE" target="_blank" rel="noopener noreferrer" aria-label="Discord">
                <FaDiscord size={20} />
            </a>
        </div>
    );
}
