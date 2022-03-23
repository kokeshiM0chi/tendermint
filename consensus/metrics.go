package consensus

import (
	"github.com/go-kit/kit/metrics"
	"github.com/go-kit/kit/metrics/discard"

	prometheus "github.com/go-kit/kit/metrics/prometheus"
	stdprometheus "github.com/prometheus/client_golang/prometheus"
)

const (
	// MetricsSubsystem is a subsystem shared by all metrics exposed by this
	// package.
	MetricsSubsystem = "consensus"
)

// Metrics contains metrics exposed by this package.
type Metrics struct {
	// Height of the chain.
	Height metrics.Gauge

	// ValidatorLastSignedHeight of a validator.
	ValidatorLastSignedHeight metrics.Gauge

	// Number of rounds.
	Rounds metrics.Gauge

	// Number of validators.
	Validators metrics.Gauge
	// Total power of all validators.
	ValidatorsPower metrics.Gauge
	// Power of a validator.
	ValidatorPower metrics.Gauge
	// Amount of blocks missed by a validator.
	ValidatorMissedBlocks metrics.Gauge
	// Number of validators who did not sign.
	MissingValidators metrics.Gauge
	// Total power of the missing validators.
	MissingValidatorsPower metrics.Gauge
	// Number of validators who tried to double sign.
	ByzantineValidators metrics.Gauge
	// Total power of the byzantine validators.
	ByzantineValidatorsPower metrics.Gauge

	// Time between this and the last block.
	BlockIntervalSeconds metrics.Gauge

	// Number of transactions.
	NumTxs metrics.Gauge
	// Size of the block.
	BlockSizeBytes metrics.Gauge
	// Total number of transactions.
	TotalTxs metrics.Gauge
	// The latest block height.
	CommittedHeight metrics.Gauge
	// Whether or not a node is fast syncing. 1 if yes, 0 if no.
	FastSyncing metrics.Gauge
	// Whether or not a node is state syncing. 1 if yes, 0 if no.
	StateSyncing metrics.Gauge

	// Number of blockparts transmitted by peer.
	BlockParts metrics.Counter

	//-----mymemo investigate gossip protocol------
	NumReceiveHasVoteMessageOnConReactor         metrics.Gauge
	NumBroadcastHasVoteMessageOnConReactor       metrics.Gauge
	NumReceiveVoteSetMaj23MessageOnConReactor    metrics.Gauge
	NumSendVoteSetMaj23MessageOnConReactor       metrics.Gauge
	NumReceiveNewValidBlockMessageOnConReactor   metrics.Gauge
	NumBroadcastNewValidBlockMessageOnConReactor metrics.Gauge
	NumReceiveNewRoundStepMessageOnConReactor    metrics.Gauge
	NumBroadcastNewRoundStepMessageOnConReactor  metrics.Gauge
	NumReceiveProposalMessageOnConReactor        metrics.Gauge
	NumSendProposalMessageOnConReactor           metrics.Gauge
	NumReceiveProposalPOLMessageOnConReactor     metrics.Gauge
	NumSendProposalPOLMessageOnConReactor        metrics.Gauge
	NumReceiveBlockPartMessageOnConReactor       metrics.Gauge
	NumSendBlockPartMessageOnConReactor          metrics.Gauge
	NumReceiveVoteMessageOnConReactor            metrics.Gauge
	NumSendVoteMessageOnConReactor               metrics.Gauge
	NumSendVotesForHeightMessageOnConReactor     metrics.Gauge // gossipVotesForHeight in gossipVotesRoutine
}

// PrometheusMetrics returns Metrics build using Prometheus client library.
// Optionally, labels can be provided along with their values ("foo",
// "fooValue").
func PrometheusMetrics(namespace string, labelsAndValues ...string) *Metrics {
	labels := []string{}
	for i := 0; i < len(labelsAndValues); i += 2 {
		labels = append(labels, labelsAndValues[i])
	}
	return &Metrics{
		Height: prometheus.NewGaugeFrom(stdprometheus.GaugeOpts{
			Namespace: namespace,
			Subsystem: MetricsSubsystem,
			Name:      "height",
			Help:      "Height of the chain.",
		}, labels).With(labelsAndValues...),
		Rounds: prometheus.NewGaugeFrom(stdprometheus.GaugeOpts{
			Namespace: namespace,
			Subsystem: MetricsSubsystem,
			Name:      "rounds",
			Help:      "Number of rounds.",
		}, labels).With(labelsAndValues...),

		Validators: prometheus.NewGaugeFrom(stdprometheus.GaugeOpts{
			Namespace: namespace,
			Subsystem: MetricsSubsystem,
			Name:      "validators",
			Help:      "Number of validators.",
		}, labels).With(labelsAndValues...),
		ValidatorLastSignedHeight: prometheus.NewGaugeFrom(stdprometheus.GaugeOpts{
			Namespace: namespace,
			Subsystem: MetricsSubsystem,
			Name:      "validator_last_signed_height",
			Help:      "Last signed height for a validator",
		}, append(labels, "validator_address")).With(labelsAndValues...),
		ValidatorMissedBlocks: prometheus.NewGaugeFrom(stdprometheus.GaugeOpts{
			Namespace: namespace,
			Subsystem: MetricsSubsystem,
			Name:      "validator_missed_blocks",
			Help:      "Total missed blocks for a validator",
		}, append(labels, "validator_address")).With(labelsAndValues...),
		ValidatorsPower: prometheus.NewGaugeFrom(stdprometheus.GaugeOpts{
			Namespace: namespace,
			Subsystem: MetricsSubsystem,
			Name:      "validators_power",
			Help:      "Total power of all validators.",
		}, labels).With(labelsAndValues...),
		ValidatorPower: prometheus.NewGaugeFrom(stdprometheus.GaugeOpts{
			Namespace: namespace,
			Subsystem: MetricsSubsystem,
			Name:      "validator_power",
			Help:      "Power of a validator",
		}, append(labels, "validator_address")).With(labelsAndValues...),
		MissingValidators: prometheus.NewGaugeFrom(stdprometheus.GaugeOpts{
			Namespace: namespace,
			Subsystem: MetricsSubsystem,
			Name:      "missing_validators",
			Help:      "Number of validators who did not sign.",
		}, labels).With(labelsAndValues...),
		MissingValidatorsPower: prometheus.NewGaugeFrom(stdprometheus.GaugeOpts{
			Namespace: namespace,
			Subsystem: MetricsSubsystem,
			Name:      "missing_validators_power",
			Help:      "Total power of the missing validators.",
		}, labels).With(labelsAndValues...),
		ByzantineValidators: prometheus.NewGaugeFrom(stdprometheus.GaugeOpts{
			Namespace: namespace,
			Subsystem: MetricsSubsystem,
			Name:      "byzantine_validators",
			Help:      "Number of validators who tried to double sign.",
		}, labels).With(labelsAndValues...),
		ByzantineValidatorsPower: prometheus.NewGaugeFrom(stdprometheus.GaugeOpts{
			Namespace: namespace,
			Subsystem: MetricsSubsystem,
			Name:      "byzantine_validators_power",
			Help:      "Total power of the byzantine validators.",
		}, labels).With(labelsAndValues...),
		BlockIntervalSeconds: prometheus.NewGaugeFrom(stdprometheus.GaugeOpts{
			Namespace: namespace,
			Subsystem: MetricsSubsystem,
			Name:      "block_interval_seconds",
			Help:      "Time between this and the last block.",
		}, labels).With(labelsAndValues...),
		NumTxs: prometheus.NewGaugeFrom(stdprometheus.GaugeOpts{
			Namespace: namespace,
			Subsystem: MetricsSubsystem,
			Name:      "num_txs",
			Help:      "Number of transactions.",
		}, labels).With(labelsAndValues...),
		BlockSizeBytes: prometheus.NewGaugeFrom(stdprometheus.GaugeOpts{
			Namespace: namespace,
			Subsystem: MetricsSubsystem,
			Name:      "block_size_bytes",
			Help:      "Size of the block.",
		}, labels).With(labelsAndValues...),
		TotalTxs: prometheus.NewGaugeFrom(stdprometheus.GaugeOpts{
			Namespace: namespace,
			Subsystem: MetricsSubsystem,
			Name:      "total_txs",
			Help:      "Total number of transactions.",
		}, labels).With(labelsAndValues...),
		CommittedHeight: prometheus.NewGaugeFrom(stdprometheus.GaugeOpts{
			Namespace: namespace,
			Subsystem: MetricsSubsystem,
			Name:      "latest_block_height",
			Help:      "The latest block height.",
		}, labels).With(labelsAndValues...),
		FastSyncing: prometheus.NewGaugeFrom(stdprometheus.GaugeOpts{
			Namespace: namespace,
			Subsystem: MetricsSubsystem,
			Name:      "fast_syncing",
			Help:      "Whether or not a node is fast syncing. 1 if yes, 0 if no.",
		}, labels).With(labelsAndValues...),
		StateSyncing: prometheus.NewGaugeFrom(stdprometheus.GaugeOpts{
			Namespace: namespace,
			Subsystem: MetricsSubsystem,
			Name:      "state_syncing",
			Help:      "Whether or not a node is state syncing. 1 if yes, 0 if no.",
		}, labels).With(labelsAndValues...),
		BlockParts: prometheus.NewCounterFrom(stdprometheus.CounterOpts{
			Namespace: namespace,
			Subsystem: MetricsSubsystem,
			Name:      "block_parts",
			Help:      "Number of blockparts transmitted by peer.",
		}, append(labels, "peer_id")).With(labelsAndValues...),
		// ==========
		// mymemo gossip protocol invstigation
		NumBroadcastHasVoteMessageOnConReactor: prometheus.NewGaugeFrom(stdprometheus.GaugeOpts{
			Namespace: namespace,
			Subsystem: MetricsSubsystem,
			Name:      "number_of_broadcast_hasvote_msgs_on_conreactor",
			Help:      "Number of broadcast messages per message type",
		}, append(labels, "peer_id", "chID", "msgType", "voteType")).With(labelsAndValues...),
		NumReceiveHasVoteMessageOnConReactor: prometheus.NewGaugeFrom(stdprometheus.GaugeOpts{
			Namespace: namespace,
			Subsystem: MetricsSubsystem,
			Name:      "number_of_receiving_hasvote_msgs_on_conreactor",
			Help:      "Number of receiving messages per message type",
		}, append(labels, "peer_id", "chID", "msgType", "voteType")).With(labelsAndValues...),
		NumSendVoteSetMaj23MessageOnConReactor: prometheus.NewGaugeFrom(stdprometheus.GaugeOpts{
			Namespace: namespace,
			Subsystem: MetricsSubsystem,
			Name:      "number_of_sending_votesetmaj23_msgs_on_conreactor",
			Help:      "Number of sending messages per message type",
		}, append(labels, "peer_id", "chID", "msgType", "voteType")).With(labelsAndValues...),
		NumReceiveVoteSetMaj23MessageOnConReactor: prometheus.NewGaugeFrom(stdprometheus.GaugeOpts{
			Namespace: namespace,
			Subsystem: MetricsSubsystem,
			Name:      "number_of_receiving_votesetmaj23_msgs_on_conreactor",
			Help:      "Number of receiving messages per message type",
		}, append(labels, "peer_id", "chID", "msgType", "voteType")).With(labelsAndValues...),
		NumBroadcastNewValidBlockMessageOnConReactor: prometheus.NewGaugeFrom(stdprometheus.GaugeOpts{
			Namespace: namespace,
			Subsystem: MetricsSubsystem,
			Name:      "number_of_broadcast_newvalidblock_msgs_on_conreactor",
			Help:      "Number of broadcast messages per message type",
		}, append(labels, "peer_id", "chID", "msgType")).With(labelsAndValues...),
		NumReceiveNewValidBlockMessageOnConReactor: prometheus.NewGaugeFrom(stdprometheus.GaugeOpts{
			Namespace: namespace,
			Subsystem: MetricsSubsystem,
			Name:      "number_of_receiving_newvalidblock_msgs_on_conreactor",
			Help:      "Number of receiving messages per message type",
		}, append(labels, "peer_id", "chID", "msgType")).With(labelsAndValues...),
		NumBroadcastNewRoundStepMessageOnConReactor: prometheus.NewGaugeFrom(stdprometheus.GaugeOpts{
			Namespace: namespace,
			Subsystem: MetricsSubsystem,
			Name:      "number_of_broadcast_newroundstep_msgs_on_conreactor",
			Help:      "Number of broadcast messages per message type",
		}, append(labels, "peer_id", "chID", "msgType", "RoundStepType")).With(labelsAndValues...),
		NumReceiveNewRoundStepMessageOnConReactor: prometheus.NewGaugeFrom(stdprometheus.GaugeOpts{
			Namespace: namespace,
			Subsystem: MetricsSubsystem,
			Name:      "number_of_receiving_newroundstep_msgs_on_conreactor",
			Help:      "Number of receiving messages per message type",
		}, append(labels, "peer_id", "chID", "msgType", "RoundStepType")).With(labelsAndValues...),
		NumSendProposalMessageOnConReactor: prometheus.NewGaugeFrom(stdprometheus.GaugeOpts{
			Namespace: namespace,
			Subsystem: MetricsSubsystem,
			Name:      "number_of_sending_proposal_msgs_on_conreactor",
			Help:      "Number of sending messages per message type",
		}, append(labels, "peer_id", "chID", "msgType", "voteType")).With(labelsAndValues...),
		NumReceiveProposalMessageOnConReactor: prometheus.NewGaugeFrom(stdprometheus.GaugeOpts{
			Namespace: namespace,
			Subsystem: MetricsSubsystem,
			Name:      "number_of_receiving_proposal_msgs_on_conreactor",
			Help:      "Number of receiving messages per message type",
		}, append(labels, "peer_id", "chID", "msgType", "voteType")).With(labelsAndValues...),
		NumSendProposalPOLMessageOnConReactor: prometheus.NewGaugeFrom(stdprometheus.GaugeOpts{
			Namespace: namespace,
			Subsystem: MetricsSubsystem,
			Name:      "number_of_sending_proposalpol_msgs_on_conreactor",
			Help:      "Number of sending messages per message type",
		}, append(labels, "peer_id", "chID", "msgType")).With(labelsAndValues...),
		NumReceiveProposalPOLMessageOnConReactor: prometheus.NewGaugeFrom(stdprometheus.GaugeOpts{
			Namespace: namespace,
			Subsystem: MetricsSubsystem,
			Name:      "number_of_receiving_proposalpol_msgs_on_conreactor",
			Help:      "Number of receiving messages per message type",
		}, append(labels, "peer_id", "chID", "msgType")).With(labelsAndValues...),
		NumSendBlockPartMessageOnConReactor: prometheus.NewGaugeFrom(stdprometheus.GaugeOpts{
			Namespace: namespace,
			Subsystem: MetricsSubsystem,
			Name:      "number_of_sending_blockpart_msgs_on_conreactor",
			Help:      "Number of sending messages per message type",
		}, append(labels, "peer_id", "chID", "msgType")).With(labelsAndValues...),
		NumReceiveBlockPartMessageOnConReactor: prometheus.NewGaugeFrom(stdprometheus.GaugeOpts{
			Namespace: namespace,
			Subsystem: MetricsSubsystem,
			Name:      "number_of_receiving_blockpart_msgs_on_conreactor",
			Help:      "Number of receiving messages per message type",
		}, append(labels, "peer_id", "chID", "msgType")).With(labelsAndValues...),
		NumSendVoteMessageOnConReactor: prometheus.NewGaugeFrom(stdprometheus.GaugeOpts{
			Namespace: namespace,
			Subsystem: MetricsSubsystem,
			Name:      "number_of_sending_vote_msgs_on_conreactor",
			Help:      "Number of sending messages per message type",
		}, append(labels, "peer_id", "chID", "msgType")).With(labelsAndValues...),
		NumReceiveVoteMessageOnConReactor: prometheus.NewGaugeFrom(stdprometheus.GaugeOpts{
			Namespace: namespace,
			Subsystem: MetricsSubsystem,
			Name:      "number_of_receiving_vote_msgs_on_conreactor",
			Help:      "Number of receiving messages per message type",
		}, append(labels, "peer_id", "chID", "msgType")).With(labelsAndValues...),
		NumSendVotesForHeightMessageOnConReactor: prometheus.NewGaugeFrom(stdprometheus.GaugeOpts{
			Namespace: namespace,
			Subsystem: MetricsSubsystem,
			Name:      "number_of_sending_voteforheight_msgs_on_conreactor",
			Help:      "Number of sending messages per message type",
		}, append(labels, "peer_id", "chID", "roundStepType", "msgType")).With(labelsAndValues...),
		// ==========
	}
}

// NopMetrics returns no-op Metrics.
func NopMetrics() *Metrics {
	return &Metrics{
		Height: discard.NewGauge(),

		ValidatorLastSignedHeight: discard.NewGauge(),

		Rounds: discard.NewGauge(),

		Validators:               discard.NewGauge(),
		ValidatorsPower:          discard.NewGauge(),
		ValidatorPower:           discard.NewGauge(),
		ValidatorMissedBlocks:    discard.NewGauge(),
		MissingValidators:        discard.NewGauge(),
		MissingValidatorsPower:   discard.NewGauge(),
		ByzantineValidators:      discard.NewGauge(),
		ByzantineValidatorsPower: discard.NewGauge(),

		BlockIntervalSeconds: discard.NewGauge(),

		NumTxs:          discard.NewGauge(),
		BlockSizeBytes:  discard.NewGauge(),
		TotalTxs:        discard.NewGauge(),
		CommittedHeight: discard.NewGauge(),
		FastSyncing:     discard.NewGauge(),
		StateSyncing:    discard.NewGauge(),
		BlockParts:      discard.NewCounter(),
		// mymemo
		// mymemo
		// ---- gossip protocol investigateion start----
		NumBroadcastHasVoteMessageOnConReactor:       discard.NewGauge(),
		NumReceiveHasVoteMessageOnConReactor:         discard.NewGauge(),
		NumReceiveVoteSetMaj23MessageOnConReactor:    discard.NewGauge(),
		NumSendVoteSetMaj23MessageOnConReactor:       discard.NewGauge(),
		NumReceiveNewValidBlockMessageOnConReactor:   discard.NewGauge(),
		NumBroadcastNewValidBlockMessageOnConReactor: discard.NewGauge(),
		NumReceiveNewRoundStepMessageOnConReactor:    discard.NewGauge(),
		NumBroadcastNewRoundStepMessageOnConReactor:  discard.NewGauge(),
		NumReceiveProposalMessageOnConReactor:        discard.NewGauge(),
		NumSendProposalMessageOnConReactor:           discard.NewGauge(),
		NumReceiveProposalPOLMessageOnConReactor:     discard.NewGauge(),
		NumSendProposalPOLMessageOnConReactor:        discard.NewGauge(),
		NumReceiveBlockPartMessageOnConReactor:       discard.NewGauge(),
		NumSendBlockPartMessageOnConReactor:          discard.NewGauge(),
		NumReceiveVoteMessageOnConReactor:            discard.NewGauge(),
		NumSendVoteMessageOnConReactor:               discard.NewGauge(),
		NumSendVotesForHeightMessageOnConReactor:     discard.NewGauge(),
		// ---- gossip protocol investigateion end----
	}
}
