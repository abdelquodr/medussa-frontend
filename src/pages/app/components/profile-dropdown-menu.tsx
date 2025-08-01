import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "../../../components/ui/dropdown-menu"
import { LogOutIcon, User } from "lucide-react"

interface DropdownMenuProps {
    trigger: React.ReactNode
}

const ProfileDropdownMenu = ({ trigger }: DropdownMenuProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>{trigger}</DropdownMenuTrigger>
            <DropdownMenuContent
                align="start"
                alignOffset={2}
                className="mr-4 w-48 rounded-sm p-0 hidden"
            >
                <DropdownMenuLabel className="flex items-center gap-x-2 p-4 font-normal px-6 border-b border-b-gray-100 bg-gray-100">
                    <span className="text-gray-500 w-24 truncate font-normal">Friday Odoh</span>
                </DropdownMenuLabel>
                {/* <DropdownMenuSeparator /> */}
                <DropdownMenuItem className="cursor-pointer p-4 font-normal px-6 border-b border-b-gray-100">
                    <User className="w-4 h-4 mr-2" />
                    <span>My Profile</span>
                </DropdownMenuItem>
                <span className="flex items-center cursor-pointer p-4 font-normal px-6 text-red-600 hover:!bg-red-50 hover:!text-red-500">
                    <LogOutIcon className="w-4 h-4 mr-2" />
                    <span>Logout</span>
                </span>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ProfileDropdownMenu