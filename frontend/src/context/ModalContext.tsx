import { createContext, ReactNode, useContext, useState } from "react"

type ModalContextType = {
    isModalOpen: boolean,
    openModal: (content: CustomModalProps) => void;
    closeModal: () => void,
    modalContent: ReactNode | null,
    header: string,
    size?: 'sm' | 'lg' | 'xl',
}

const ModalContext = createContext<ModalContextType | undefined> (undefined);

interface ModalProviderProps {
    children: ReactNode
}

export interface CustomModalProps {
    content: ReactNode,
    header: string,
    size?: 'sm' | 'lg' | 'xl',
}

export function ModalProvider(props: ModalProviderProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState<ReactNode | null>(null)
    const [header, setHeader] = useState('');
    const [size, setSize] = useState<'sm'| 'lg' | 'xl'>();

    const openModal = (modal: CustomModalProps) => {
        setModalContent(modal.content);
        setHeader(modal.header);
        setSize(modal.size);
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setModalContent(null);
        setIsModalOpen(false);
    };

    return (
        <ModalContext.Provider value={{ isModalOpen, openModal, closeModal, modalContent, header, size }}>
            {props.children}
        </ModalContext.Provider>
    )
}

export const useModal = (): ModalContextType => {
    const context = useContext(ModalContext);
    if(!context) {
        throw new Error('useModal doit être utilisé dans un Modal Provider');
    }

    return context;
}