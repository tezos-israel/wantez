import PropTypes from 'prop-types';
import { useState } from 'react';

import { LoginModal } from './LoginModal';
import WelcomeModal from './WelcomeModal';
import OnboardingModal from './OnboardingModal';

import { useBoolean } from 'hooks/useBoolean';

export function LoginModals({ isLoginModalOpen, closeLoginModal }) {
  const [
    isWelcomeModalOpen,
    openWelcomeModal,
    closeWelcomeModal,
  ] = useBoolean();
  const [
    isOnboardingModalOpen,
    openOnboardingModal,
    closeOnboardingModal,
  ] = useBoolean();
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');

  return (
    <>
      <LoginModal isOpen={isLoginModalOpen} onDismiss={handleFinishLogin} />
      <WelcomeModal
        name={name}
        isOpen={isWelcomeModalOpen}
        onDismiss={closeWelcomeModal}
      />
      <OnboardingModal
        userId={userId}
        isOpen={isOnboardingModalOpen}
        onDismiss={handleFinishOnboarding}
      />
    </>
  );

  function handleFinishLogin(user) {
    closeLoginModal();
    if (user.name) {
      setName(user.name);
      openWelcomeModal();
      return;
    }
    setUserId(user.id);
    openOnboardingModal();
  }

  function handleFinishOnboarding({ firstName }) {
    closeOnboardingModal();
    setName(firstName);
    openWelcomeModal();
  }
}

LoginModals.propTypes = {
  isLoginModalOpen: PropTypes.bool.isRequired,
  closeLoginModal: PropTypes.func.isRequired,
};
