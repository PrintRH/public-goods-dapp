//SPDX-License-Identifier: MIT
pragma solidity >0.8.20;

/**
 * Smart contract to allow crowdfunding for buidlguidl batch1 project!
 * @author rhbdl
 */
contract Crowdfunding {
	// State Variables
	struct Campaign {
		address payable owner;
		string title;
		string description;
		uint256 id;
		uint256 goal;
		uint256 deadline;
		uint256 raised;
		string image; // might need to change this to take IPFS hash
		address[] contributors;
		uint256[] contributions;
		bool isArchived;
	}

	mapping(uint256 => Campaign) public campaigns;

	uint256 public campaignCount = 0;

	modifier onlyOwner(uint256 _id) {
		require(
			msg.sender == campaigns[_id].owner,
			"Only owner can call this function"
		);
		_;
	}

	// function to create a new campaign and return the campaign ID
	function createCampaign(
		address _owner,
		string memory _title,
		string memory _description,
		uint256 _goal,
		uint256 _deadline,
		string memory _image
	) public returns (uint256) {
		Campaign storage campaign = campaigns[campaignCount];
		require(_deadline > block.timestamp, "Deadline must be in future");

		_owner = msg.sender;
		campaign.owner = payable(_owner);
		campaign.title = _title;
		campaign.description = _description;
		campaign.goal = _goal;
		campaign.deadline = _deadline;
		campaign.raised = 0;
		campaign.image = _image;
		campaign.isArchived = false;

		campaign.id = campaignCount;
		campaignCount++;
		return campaignCount;
	}

	// function to contribute to a campaign
	function contributeToCampaign(uint256 _id) public payable {
		Campaign storage campaign = campaigns[_id];
		require(msg.value > 0, "Must contribute a positive amount");
		require(campaign.deadline > block.timestamp, "Campaign has ended");
		require(!campaign.isArchived, "Campaign is archived");

		campaign.raised += msg.value;
		campaign.contributors.push(msg.sender);
		campaign.contributions.push(msg.value);
	}

	// function to get campaign contributors details
	function getContributors(
		uint256 _id
	) public view returns (address[] memory, uint256[] memory) {
		return (campaigns[_id].contributors, campaigns[_id].contributions);
	}

	// function to get all campaigns
	function getCampaigns() public view returns (Campaign[] memory) {
		Campaign[] memory allCampaigns = new Campaign[](campaignCount);

		for (uint i = 0; i < campaignCount; i++) {
			allCampaigns[i] = campaigns[i];
		}

		return allCampaigns;
	}

	function withdrawFunds(uint256 _id) public payable onlyOwner(_id) {
		Campaign storage campaign = campaigns[_id];
		require(
			campaign.raised >= campaign.goal,
			"Campaign has not reached goal"
		);
		(bool success, ) = msg.sender.call{ value: campaign.raised }("");
		require(success, "Transfer failed.");
		campaign.isArchived = true;
	}
}
