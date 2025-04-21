

# Termainal Portfolio
function projects_menu() {
    echo -e "\e[1;35mChoose a project:\e[0m"
    select choice in "GitHub" "Game Dev" "Projects" "Back"; do
        case $choice in
            "GitHub") echo "Check out my GitHub: github.com/Irtaza2009" | lolcat;;
            "Game Dev") echo "I've made some cool games! Check them out here: https://www.irtaza.xyz/portfolio/#my-games" | lolcat;;
            "Projects") echo "See some projects I have made! Visit: https://www.irtaza.xyz/portfolio/#portfolio" | lolcat;;
            "Back") break;;
            *) echo "Invalid choice, try again." | lolcat;;
        esac
    done
}

function exit_effect() {
    echo "Self-destruct sequence initiated..." | pv -qL 10 | lolcat
    sleep 1
    echo "3..." | pv -qL 10 | lolcat
    sleep 1
    echo "2..." | pv -qL 10 | lolcat
    sleep 1
    echo "1..." | pv -qL 10 | lolcat
    figlet "Goodbye!" | lolcat
}

if [ -z "$SSH_TTY" ]; then return; fi
echo "Loading Irtaza's Portfolio..." | pv -qL 10 | lolcat

clear

#figlet -f slant "Irtaza's Terminal" | lolcat
figlet "Irtaza's Terminal" | lolcat

echo "=============================" | lolcat
WELCOME_MSGS=("Hello, traveler!" "Hello, hacker!" "Enter the matrix..." "Ready to code?")
RANDOM_MSG=${WELCOME_MSGS[$RANDOM % ${#WELCOME_MSGS[@]}]}
echo -e "\e[1;34m$RANDOM_MSG 🚀\e[0m" | lolcat

echo -e "\e[1;34mWelcome to my SSH Portfolio! 🚀 \e[0m" | lolcat
echo -e "\e[1;32mI am Irtaza, a highscool student, programmer and hobbyist game developer.\e[0m"
echo -e "\e[1;36mType 'projects' to see my work, 'about' to know more, or 'exit' to leave.\e[0m"
echo -e "\e[1;33mType 'contact' to view my email!\e[0m"
echo "=============================" | lolcat

while true; do
    echo -n "> "
    read input
    case $input in
        projects) projects_menu ;;
        about) echo "I'm a developer who loves building cool things! Type 'web' to view my portfolio website!" | lolcat
                FUN_FACTS=("I started programming at 13!" "I love playing table tennis." "Huge Pokémon fan!" "I enjoy making games!")
                RANDOM_FACT=${FUN_FACTS[$RANDOM % ${#FUN_FACTS[@]}]}    
                echo -e "\e[1;36mFun Fact: $RANDOM_FACT\e[0m" | lolcat
                ;;
        web) echo "Check out my website at https://www.irtaza.xyz/portfolio" | lolcat;;
        contact) echo "Email me at: irtazanaqvi05@gmail.com" | lolcat;;
        secret)
            echo "“The best way to predict the future is to invent it.” - Alan Kay" | lolcat
            ;;
        exit) exit_effect; break ;;
        *) echo "Unknown command. Try 'projects', 'about', 'web', 'contact', or 'exit'." ;;
    esac
done


