package in.scalive.votingApp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import in.scalive.votingApp.dto.ElectionResultRequestDTO;
import in.scalive.votingApp.dto.ElectionResultResponseDTO;
import in.scalive.votingApp.entity.ElectionResult;
import in.scalive.votingApp.service.ElectionResultService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/election-result")
@CrossOrigin
public class ElectionResultController {
	private ElectionResultService electionResultService;

	@Autowired
	public ElectionResultController(ElectionResultService electionResultService) {
		this.electionResultService = electionResultService;
	}

	@PostMapping("/declare")
	public ResponseEntity<ElectionResultResponseDTO> declareElectionResult(
			@RequestBody @Valid ElectionResultRequestDTO electionResultDTO) {
		ElectionResult result = electionResultService.declareElectionResult(electionResultDTO.getElectionName());
		ElectionResultResponseDTO responseDTO = new ElectionResultResponseDTO();
		responseDTO.setElectionName(result.getElectionName());
		responseDTO.setTotalVotes(result.getTotalVotes());
		responseDTO.setWinnerId(result.getWinnerId());
		responseDTO.setWinnerVotes(result.getWinner().getVoteCount());
		return ResponseEntity.ok(responseDTO);
	}

	@GetMapping
	public ResponseEntity<List<ElectionResult>> getAllResults() {
		List<ElectionResult> results = electionResultService.getAllResults();
		return ResponseEntity.ok(results);
	}

}
