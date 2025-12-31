import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../../../libs/api';

// Recursive TeamNode component for L2 onwards
// expandedId and onExpand are passed from parent for accordion behavior
function TeamNode({ user, expandedId, onExpand, isFirst = false }) {
  const isExpanded = expandedId === user.id;
  const [childExpandedId, setChildExpandedId] = useState(null);

  // Fetch children when expanded
  const { data, isLoading } = useQuery({
    queryKey: ['downline', user.id],
    queryFn: async () => {
      const response = await api.get(`/api/referral/downline/${user.id}`);
      return response.data;
    },
    enabled: isExpanded,
  });

  const handleClick = () => {
    // Toggle: if already expanded, collapse; else expand this and collapse siblings
    onExpand(isExpanded ? null : user.id);
    setChildExpandedId(null); // Reset child expansion when toggling
  };

  const hasChildren = user.hasChildren;
  const children = data?.children || [];

  // Render leaf node (no children) - plain top_team div
  if (!hasChildren) {
    return (
      <div className="top_team">
        <div className="avatar">
          <img src="/images/user_account.svg" alt="user" />
        </div>
        <div className="meta">
          <div className="name">{user.username}</div>
          <div className="id">ID:</div>
          <div className="rank">{user.highestPlan || 'Member'}</div>
        </div>
      </div>
    );
  }

  // Render node with children - wrapped in team_sup
  return (
    <div className="team_sup">
      <div
        className="top_team"
        onClick={handleClick}
        style={{ cursor: 'pointer' }}
      >
        <div className="avatar">
          <img src="/images/user_account.svg" alt="user" />
        </div>
        <div className="meta">
          <div className="name">{user.username}</div>
          <div className="id">ID:</div>
          <div className="rank">{user.highestPlan || 'Member'}</div>
        </div>
      </div>

      {isExpanded && (
        <div className="subteam">
          {isLoading ? (
            <div className="top_team">
              <div className="meta">
                <div className="name">Loading...</div>
              </div>
            </div>
          ) : children.length > 0 ? (
            children.map((child, index) => (
              <TeamNode
                key={child.id}
                user={child}
                expandedId={childExpandedId}
                onExpand={setChildExpandedId}
                isFirst={index === 0}
              />
            ))
          ) : (
            <div className="top_team">
              <div className="meta">
                <div className="name">No referrals</div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function Team() {
  const [isRootExpanded, setIsRootExpanded] = useState(false);
  const [expandedL1Id, setExpandedL1Id] = useState(null);

  const { data: rootData, isLoading, error } = useQuery({
    queryKey: ['root-user'],
    queryFn: async () => {
      const response = await api.get('/api/referral/downline');
      return response.data;
    },
  });

  const { data: childrenData, isLoading: childrenLoading } = useQuery({
    queryKey: ['root-children'],
    queryFn: async () => {
      const response = await api.get('/api/referral/downline');
      return response.data;
    },
    enabled: isRootExpanded,
  });

  if (isLoading) {
    return (
      <div className="dashboard_right">
        <div className="team_section">
          <div className="top_team first_team">
            <div className="avatar">
              <img src="/images/user_account.svg" alt="user" />
            </div>
            <div className="meta">
              <div className="name">Loading...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard_right">
        <div className="team_section">
          <div className="top_team first_team">
            <div className="avatar">
              <img src="/images/user_account.svg" alt="user" />
            </div>
            <div className="meta">
              <div className="name">Error loading team data</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const rootUser = rootData?.user;
  const children = childrenData?.children || [];

  return (
    <div className="dashboard_right">
      <div className="team_section">
        {rootUser && (
          <>
            <div
              className="top_team first_team"
              onClick={() => {
                setIsRootExpanded(!isRootExpanded);
                setExpandedL1Id(null);
              }}
              style={{ cursor: 'pointer' }}
            >
              <div className="avatar">
                <img src="/images/user_account.svg" alt="user" />
              </div>
              <div className="meta">
                <div className="name">{rootUser.username}</div>
                <div className="id">ID:</div>
                <div className="rank">{rootUser.highestPlan || 'Leader'}</div>
              </div>
            </div>

            {isRootExpanded && (
              <div className="team_list">
                {childrenLoading ? (
                  <div className="top_team">
                    <div className="meta">
                      <div className="name">Loading...</div>
                    </div>
                  </div>
                ) : children.length > 0 ? (
                  children.map((child, index) => (
                    <TeamNode
                      key={child.id}
                      user={child}
                      expandedId={expandedL1Id}
                      onExpand={setExpandedL1Id}
                      isFirst={index === 0}
                    />
                  ))
                ) : (
                  <div className="top_team">
                    <div className="meta">
                      <div className="name">No direct referrals</div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
