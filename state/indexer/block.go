package indexer

import (
	"context"

	"github.com/tendermint/tendermint/libs/pubsub/query"
	"github.com/tendermint/tendermint/types"
)

// BlockIndexer defines an interface contract for indexing block events.
type BlockIndexer interface {
	// Index indexes BeginBlock and EndBlock events for a given block by its height.
	Index(types.EventDataNewBlockHeader) error

	// Search performs a query for block heights that match a given BeginBlock
	// and Endblock event search criteria.
	Search(ctx context.Context, q *query.Query) ([]int64, error)
}
