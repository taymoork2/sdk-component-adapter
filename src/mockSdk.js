export const mockSDKRoom = {
  id: 'abc',
  type: 'group',
  title: 'mock room',
};

export const mockSDKPerson = {
  id: 'personIDCurrentUser',
  emails: ['email@cisco.com'],
  displayName: 'Webex Components',
  firstName: 'Webex',
  lastName: 'Components',
  avatar: 'avatar',
  orgId: 'orgID',
};

export const mockSDKMeeting = {
  id: 'meetingID',
  sipuri: 'my meeting',
  members: {
    membersCollection: {
      members: {
        person1: {
          id: 'id',
          name: 'Barbara German',
          isInMeeting: true,
          isUser: true,
          isAudioMuted: false,
          isContentSharing: false,
          isHost: false,
          isGuest: false,
          isSelf: true,
          participant: {
            person: {
              ...mockSDKPerson,
            },
          },
        },
        person2: {
          id: 'mutedPerson',
          name: 'Brenda Song',
          isInMeeting: true,
          isUser: true,
          isAudioMuted: true,
          isContentSharing: true,
          isHost: true,
          isGuest: true,
          participant: {
            person: {
              ...mockSDKPerson,
            },
          },
        },
        notJoinedPerson: {
          id: 'notJoinedPerson',
          name: 'Giacomo Edwards',
          isInMeeting: false,
          isUser: true,
          isAudioMuted: false,
          isContentSharing: false,
          isHost: false,
          isGuest: true,
          participant: {
            person: {
              ...mockSDKPerson,
            },
          },
        },
        device: {
          id: 'device',
          isInMeeting: true,
          isUser: false,
          isAudioMuted: false,
          isContentSharing: false,
          isHost: false,
          isGuest: false,
          participant: {
            person: {
              ...mockSDKPerson,
            },
          },
        },
      },
    },
    on: jest.fn(),
  },
  addMedia: jest.fn(() => Promise.resolve()),
  emit: jest.fn(() => Promise.resolve()),
  getMediaStreams: jest.fn((constraint) => Promise.resolve([constraint.sendAudio ? ['localAudio'] : ['localVideo']])),
  muteAudio: jest.fn(() => Promise.resolve()),
  muteVideo: jest.fn(() => Promise.resolve()),
  register: jest.fn(() => Promise.resolve()),
  syncMeetings: jest.fn(() => Promise.resolve()),
  unregister: jest.fn(() => Promise.resolve()),
  join: jest.fn(() => Promise.resolve()),
  unmuteAudio: jest.fn(() => Promise.resolve()),
  unmuteVideo: jest.fn(() => Promise.resolve()),
  canUpdateMedia: jest.fn(() => true),
  updateShare: jest.fn(() => Promise.resolve()),
};

export const mockSDKMembership = {
  id: 'id',
  roomId: 'roomID',
  personId: 'personID',
  personOrgId: 'organizationID',
  personEmail: 'email@cisco.com',
  personDisplayName: 'Simon Damiano',
  isModerator: false,
  isMonitor: false,
  created: '',
};

export const mockSDKOrganization = {
  id: 'organizationID',
  displayName: 'Cisco Systems, Inc.',
};

/**
 * Creates a mock instance of the Webex SDK used in unit testing
 *
 * @returns {object} mockSDK Instance
 */
export default function createMockSDK() {
  return {
    rooms: {
      get: jest.fn(() => Promise.resolve(mockSDKRoom)),
      listen: jest.fn(() => Promise.resolve()),
      off: jest.fn(),
      on: jest.fn(),
      stopListening: jest.fn(() => Promise.resolve()),
      trigger: jest.fn(),
    },
    internal: {
      mercury: {
        on: jest.fn(),
        off: jest.fn(),
      },
      presence: {
        get: jest.fn(() => Promise.resolve({status: 'active'})),
        subscribe: jest.fn(() => Promise.resolve({responses: [{status: {status: 'active'}}]})),
        unsubscribe: jest.fn(() => Promise.resolve()),
      },
    },
    people: {
      get: jest.fn(() => Promise.resolve(mockSDKPerson)),
    },
    meetings: {
      create: jest.fn(() => Promise.resolve(mockSDKMeeting)),
      getMeetingByType: jest.fn((_, ID) => (ID === 'meetingID' ? mockSDKMeeting : undefined)),
      members: {
        on: jest.fn(),
      },
    },
    memberships: {
      listen: jest.fn(() => Promise.resolve()),
      list: jest.fn(() => Promise.resolve({
        items: [
          mockSDKMembership,
          {
            ...mockSDKMembership,
            personOrgId: 'organizationID3',
            personId: 'personID3',
            personDisplayName: '',
          },
          {
            ...mockSDKMembership,
            personOrgId: 'organizationID1',
            personId: 'personIDCurrentUser',
            personDisplayName: 'Zlatan The Current User',
          },
          {
            ...mockSDKMembership,
            personOrgId: 'organizationID2',
            personId: 'personID2',
            personDisplayName: 'Maria Rossi',
          },
        ],
      })),
      stopListening: jest.fn(() => Promise.resolve()),
      on: jest.fn(),
      off: jest.fn(),
    },
  };
}
