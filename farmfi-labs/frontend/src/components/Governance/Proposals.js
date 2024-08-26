import React, { useEffect, useState } from 'react';
import GovernanceService from '../../services/GovernanceService';
import './Proposal.css'; // Assuming a CSS file for proposal-specific styling

const Proposal = () => {
  const [proposals, setProposals] = useState([]);
  const [newProposal, setNewProposal] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const fetchedProposals = await GovernanceService.getProposals();
        setProposals(fetchedProposals);
      } catch (error) {
        console.error('Failed to fetch proposals', error);
      }
    };
    fetchProposals();
  }, []);

  const handleCreateProposal = async () => {
    setIsSubmitting(true);
    try {
      await GovernanceService.createProposal(newProposal);
      setMessage('Proposal submitted successfully.');
      setNewProposal('');
      const updatedProposals = await GovernanceService.getProposals();
      setProposals(updatedProposals);
    } catch (error) {
      console.error('Failed to submit proposal', error);
      setMessage('Failed to submit proposal. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVote = async (proposalId, vote) => {
    try {
      await GovernanceService.voteOnProposal(proposalId, vote);
      setMessage(`Voted ${vote === 'yes' ? 'Yes' : 'No'} on proposal ${proposalId}.`);
      const updatedProposals = await GovernanceService.getProposals();
      setProposals(updatedProposals);
    } catch (error) {
      console.error('Failed to vote on proposal', error);
      setMessage('Failed to vote. Please try again.');
    }
  };

  return (
    <div className="proposal-container">
      <h2>Governance Proposals</h2>
      <p className="proposal-intro">
        View, create, and vote on governance proposals to influence the future of FarmFi Labs.
      </p>

      {message && <div className="message">{message}</div>}

      <div className="create-proposal">
        <h3>Create a New Proposal</h3>
        <textarea
          value={newProposal}
          onChange={(e) => setNewProposal(e.target.value)}
          placeholder="Enter your proposal here..."
          required
        />
        <button onClick={handleCreateProposal} disabled={isSubmitting || !newProposal}>
          {isSubmitting ? 'Submitting...' : 'Submit Proposal'}
        </button>
      </div>

      <div className="existing-proposals">
        <h3>Existing Proposals</h3>
        {proposals.length > 0 ? (
          proposals.map((proposal) => (
            <div key={proposal.id} className="proposal-item">
              <h4>Proposal #{proposal.id}</h4>
              <p>{proposal.description}</p>
              <p>
                <strong>Votes:</strong> Yes - {proposal.votes.yes}, No - {proposal.votes.no}
              </p>
              <button onClick={() => handleVote(proposal.id, 'yes')}>Vote Yes</button>
              <button onClick={() => handleVote(proposal.id, 'no')}>Vote No</button>
            </div>
          ))
        ) : (
          <p>No proposals available.</p>
        )}
      </div>
    </div>
  );
};

export default Proposal;
