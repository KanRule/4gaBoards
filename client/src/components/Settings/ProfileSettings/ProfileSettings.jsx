import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import AvatarEditPopup from './AvatarEditPopup';
import User from '../../User';
import UserInformationEdit from '../../UserInformationEdit';
import { Icon, IconType, IconSize, Button, ButtonStyle } from '../../Utils';

import styles from './ProfileSettings.module.scss';
import sShared from '../SettingsShared.module.scss';

const ProfileSettings = React.memo(({ name, avatarUrl, phone, organization, isAvatarUpdating, onUpdate, onAvatarUpdate }) => {
  const [t] = useTranslation();

  const handleAvatarDelete = useCallback(() => {
    onUpdate({
      avatarUrl: null,
    });
  }, [onUpdate]);

  return (
    <div className={sShared.wrapper}>
      <div className={sShared.header}>
        <h2 className={sShared.headerText}>{t('common.profile')}</h2>
      </div>
      <div className={sShared.contentWrapper}>
        <div className={styles.avatarEdit}>
          <div className={styles.avatarText}>{t('common.avatarText')}</div>
          <div className={styles.avatarImage}>
            <div className={styles.avatarImage2}>
              <AvatarEditPopup defaultValue={avatarUrl} onUpdate={onAvatarUpdate} onDelete={handleAvatarDelete} offset={-25} position="bottom">
                <User name={name} avatarUrl={avatarUrl} size="profile" isDisabled={isAvatarUpdating} onClick={() => {}} />
                <Button style={ButtonStyle.NoBackground} title={t('action.edit')} className={styles.editButton}>
                  <Icon type={IconType.Plus} size={IconSize.Size10} className={styles.iconEditButton} />
                  {t('action.edit')}
                </Button>
              </AvatarEditPopup>
            </div>
          </div>
        </div>
        <UserInformationEdit defaultData={{ name, phone, organization }} onUpdate={onUpdate} />
      </div>
    </div>
  );
});

ProfileSettings.propTypes = {
  name: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string,
  phone: PropTypes.string,
  organization: PropTypes.string,
  isAvatarUpdating: PropTypes.bool.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onAvatarUpdate: PropTypes.func.isRequired,
};

ProfileSettings.defaultProps = {
  avatarUrl: undefined,
  phone: undefined,
  organization: undefined,
};

export default ProfileSettings;
