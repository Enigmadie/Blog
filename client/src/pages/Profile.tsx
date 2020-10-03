import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions, RootState } from 'slices';
import { RouteComponentProps, Link } from 'react-router-dom';
import axios from 'axios';

import routes from '../routes';

type TParams = { login: string };

const Profile = ({ match }: RouteComponentProps<TParams>): ReactElement => {
  const dispatch = useDispatch();
  const { logoutProfile } = actions;
  const [profile, setProfile] = useState({ login: '', avatar: '' });

  const { profile: authProfile } = useSelector((state: RootState) => state);

  const logoutHandler = (): void => {
    localStorage.setItem('authorization', '');
    dispatch(logoutProfile());
  };

  const currentLogin = match.params.login;

  useEffect(() => {
    (async (): Promise<void> => {
      const {
        data:
        {
          login,
          avatar,
        },
      } = await axios.get(routes.profileApiPath({ login: currentLogin }));
      setProfile({ login, avatar });
    })();
  }, [currentLogin]);

  return (
    <div className="profile-wrapper">
      {profile.login !== 'not exist' ? (
        <>
          <img src={profile.avatar} />
          <h1>{profile.login}</h1>
          { authProfile.login === profile.login && (
            <>
              <Link to="/changepassword">Change Password</Link>
              <button type="button" onClick={logoutHandler}>Logout</button>
            </>
          )}
        </>
      ) : (
        <h2>Profile does not exist or was not created</h2>
      )}
    </div>
  );
};

export default Profile;
