import { Fragment, useRef, useState } from "react"
import { Popover, Transition } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/solid"

function classNames(...classes) {
    return classes.filter(Boolean).join(" ")
}

export default function FlyoutMenu({
    menuTitle = "English",
    linksArray
}) {
    let timeout;
    const timeoutDuration = 400

    const buttonRef = useRef(null);
    const [openState, setOpenState] = useState(false);

    const toggleMenu = () => {
        setOpenState((openState) => !openState)
        buttonRef?.current?.click()
    }

    const onHover = (open, action) => {
        if (
            (!open && !openState && action === "onMouseEnter") ||
            (open && openState && action === "onMouseLeave")
        ) {
            clearTimeout(timeout);
            timeout = setTimeout(() => toggleMenu(open), timeoutDuration)
        }
    }

    const handleClick = (open) => {
        setOpenState(!open)
        clearTimeout(timeout)
    }

    const LINK_STYLES = classNames(
        "w-32 text-base uppercase font-semibold",
        "transition duration-300 ease-in-out"
    )
    const handleClickOutside = (event) => {
        if (buttonRef.current && !buttonRef.current.contains(event.target)) {
            event.stopPropagation()
        }
    }
    // useEffect(() => {
    //     document.addEventListener("mousedown", handleClickOutside)

    //     return () => {
    //         document.removeEventListener("mousedown", handleClickOutside)
    //     }
    // })
    return (
        <div className="w-full h-full absolute inset-0">
            <Popover className="relative mx-auto w-20">
                {({ open }) => (
                    <div
                        // onMouseEnter={() => onHover(open, "onMouseEnter")}
                        // onMouseLeave={() => onHover(open, "onMouseLeave")}
                        className="flex flex-col"
                    >
                        <Popover.Button ref={buttonRef}>
                            <div
                                className={classNames(
                                    "flex justify-center gap-[4px]",
                                    LINK_STYLES
                                )}
                            // onClick={() => handleClick(open)}
                            >
                                <span className="uppercase">
                                    {menuTitle}
                                    <ChevronDownIcon
                                        className="h-6 w-6 inline-block"
                                    />
                                </span>
                            </div>
                        </Popover.Button>

                        <Transition
                            show={open}
                            as={Fragment}
                        >
                            <Popover.Panel static className="z-10 w-32 mx-auto">
                                <div
                                    className={classNames(
                                        "relative grid space-y-[2px]",
                                        "divide-y-2 rounded-md text-center gap-[2px]"
                                    )}
                                >
                                    {linksArray.map(([title, href]) => (
                                        <Fragment key={"PopoverPanel<>" + title + href}>
                                            <a href={'www.google.com'} target="_blank" className={LINK_STYLES}>
                                                {title}
                                            </a>
                                        </Fragment>
                                    ))}
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </div>
                )}
            </Popover>
        </div>
    )
}
