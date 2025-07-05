import { Transition } from '@headlessui/react';
import { Link } from '@inertiajs/react';
import { createContext, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

const DropDownContext = createContext();

const Dropdown = ({ children }) => {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen((previousState) => !previousState);
    };

    const contextValue = useMemo(() => ({ open, setOpen, toggleOpen }), [open]);

    return (
        <DropDownContext.Provider value={contextValue}>
            <div className="relative">{children}</div>
        </DropDownContext.Provider>
    );
};

Dropdown.propTypes = {
    children: PropTypes.node.isRequired,
};

const Trigger = ({ children }) => {
    const { open, setOpen, toggleOpen } = useContext(DropDownContext);

    return (
        <>
            <div onClick={toggleOpen} onKeyDown={toggleOpen} role="button" tabIndex="0">
                {children}
            </div>

            {open && (
                <button
                    data-testid="dropdown-overlay"
                    className="fixed inset-0 z-40 cursor-default"
                    onClick={() => setOpen(false)}
                ></button>
            )}
        </>
    );
};

Trigger.propTypes = {
    children: PropTypes.node.isRequired,
};

const Content = ({ align = 'right', width = '48', contentClasses = 'py-1 bg-white', children }) => {
    const { open, setOpen } = useContext(DropDownContext);

    let alignmentClasses = 'origin-top';

    if (align === 'left') {
        alignmentClasses = 'ltr:origin-top-left rtl:origin-top-right start-0';
    } else if (align === 'right') {
        alignmentClasses = 'ltr:origin-top-right rtl:origin-top-left end-0';
    }

    let widthClasses = '';
    if (width === '48') {
        widthClasses = 'w-48';
    } else {
        widthClasses = `w-${width}`;
    }

    return (
        <Transition
            show={open}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
        >
            <div
                className={`absolute z-50 mt-2 rounded-md shadow-lg ${alignmentClasses} ${widthClasses}`}
                onClick={() => setOpen(false)}
                onKeyDown={() => setOpen(false)}
                role="menu"
                tabIndex="-1"
            >
                <div className={`rounded-md ring-1 ring-black ring-opacity-5 ` + contentClasses}>{children}</div>
            </div>
        </Transition>
    );
};

Content.propTypes = {
    align: PropTypes.string,
    width: PropTypes.string,
    contentClasses: PropTypes.string,
    children: PropTypes.node.isRequired,
};

const DropdownLink = ({ className = '', children, ...props }) => {
    return (
        <Link
            {...props}
            className={
                'block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:bg-gray-100 focus:outline-none ' +
                className
            }
        >
            {children}
        </Link>
    );
};

DropdownLink.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};

Dropdown.Trigger = Trigger;
Dropdown.Content = Content;
Dropdown.Link = DropdownLink;

export default Dropdown;
