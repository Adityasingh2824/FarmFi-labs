import React, { useEffect, useState } from 'react';
import GovernanceService from '../../services/GovernanceService';
import './Voting.css'; // Assuming a CSS file for voting-specific styling

const Voting = () => {
  const [proposals, setProposals] = useState([]);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [isVoting, setIsVoting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const fetchedProposals = await GovernanceService.getActiveProposals();
        setProposals(fetchedProposals);
      } catch (error) {
        console.error('Failed to fetch active proposals', error);
      }
    };
    fetchProposals();
  }, []);

  const handleVote = async (proposalId, vote) => {
    setIsVoting(true);
    try {
      await GovernanceService.voteOnProposal(proposalId, vote);
      setMessage(`Successfully voted ${vote === 'yes' ? 'Yes' : 'No'} on proposal #${proposalId}`);
      const updatedProposals = await GovernanceService.getActiveProposals();
      setProposals(updatedProposals);
    } catch (error) {
      console.error('Failed to vote on proposal', error);
      setMessage('Failed to vote. Please try again.');
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <div className="voting-container">
      <h2>Active Governance Proposals</h2>
      <p className="voting-intro">
        Review active governance proposals and cast your vote to influence the future of FarmFi Labs.
      </p>

      {message && <div className="message">{message}</div>}

      <div className="active-proposals">
        {proposals.length > 0 ? (
          proposals.map((proposal) => (
            <div key={proposal.id} className="proposal-item">
              <h4>Proposal #{proposal.id}</h4>
              <p>{proposal.description}</p>
              <p>
                <strong>Votes:</strong> Yes - {proposal.votes.yes}, No - {proposal.votes.no}
              </p>
              <button onClick={() => handleVote(proposal.id, 'yes')} disabled={isVoting}>
                {isVoting ? 'Voting...' : 'Vote Yes'}
              </button>
              <button onClick={() => handleVote(proposal.id, 'no')} disabled={isVoting}>
                {isVoting ? 'Voting...' : 'Vote No'}
              </button>
            </div>
          ))
        ) : (
          <p>No active proposals available for voting.</p>
        )}
      </div>
    </div>
  );
};

export default Voting;
