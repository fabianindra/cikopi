import React, { useState } from 'react';
import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader } from '@chakra-ui/react';

interface CashierEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    id: string;
    currentUsername: string;
    currentRole: string;
    onSave: (id: string, username: string, password: string) => Promise<void>;
}

const CashierEditModal: React.FC<CashierEditModalProps> = ({ isOpen, onClose, id, currentUsername, currentRole, onSave }) => {
    const [username, setUsername] = useState(currentUsername);
    const [password, setPassword] = useState('');

    const handleSave = async () => {
        if (window.confirm('Are you sure you want to edit?')) {
            await onSave(id, username, password);
            onClose();
          }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                <ModalHeader>Edit Cashier</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Input
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        mb={3}
                    />
                    <Input
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleSave}>
                        Save
                    </Button>
                    <Button variant="ghost" onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default CashierEditModal;
