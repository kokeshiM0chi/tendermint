(window.webpackJsonp=window.webpackJsonp||[]).push([[271],{846:function(e,t,o){"use strict";o.r(t);var n=o(1),s=Object(n.a)({},(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[o("h1",{attrs:{id:"proposer-based-timestamps-runbook"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#proposer-based-timestamps-runbook"}},[e._v("#")]),e._v(" Proposer-Based Timestamps Runbook")]),e._v(" "),o("p",[e._v("Version v0.36 of Tendermint added new constraints for the timestamps included in\neach block created by Tendermint. The new constraints mean that validators may\nfail to produce valid blocks or may issue "),o("code",[e._v("nil")]),e._v(" "),o("code",[e._v("prevotes")]),e._v(" for proposed blocks\ndepending on the configuration of the validator's local clock.")]),e._v(" "),o("h2",{attrs:{id:"what-is-this-document-for"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#what-is-this-document-for"}},[e._v("#")]),e._v(" What is this document for?")]),e._v(" "),o("p",[e._v("This document provides a set of actionable steps for application developers and\nnode operators to diagnose and fix issues related to clock synchronization and\nconfiguration of the Proposer-Based Timestamps "),o("a",{attrs:{href:"https://github.com/tendermint/tendermint/blob/master/spec/core/data_structures.md#synchronyparams",target:"_blank",rel:"noopener noreferrer"}},[e._v("SynchronyParams"),o("OutboundLink")],1),e._v(".")]),e._v(" "),o("p",[e._v("Use this runbook if you observe that validators are frequently voting "),o("code",[e._v("nil")]),e._v(" for a block that the rest\nof the network votes for or if validators are frequently producing block proposals\nthat are not voted for by the rest of the network.")]),e._v(" "),o("h2",{attrs:{id:"requirements"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#requirements"}},[e._v("#")]),e._v(" Requirements")]),e._v(" "),o("p",[e._v("To use this runbook, you must be running a node that has the "),o("a",{attrs:{href:"https://github.com/tendermint/tendermint/blob/master/docs/nodes/metrics.md",target:"_blank",rel:"noopener noreferrer"}},[e._v("Prometheus metrics endpoint enabled"),o("OutboundLink")],1),e._v("\nand the Tendermint RPC endpoint enabled and accessible.")]),e._v(" "),o("p",[e._v("It is strongly recommended to also run a Prometheus metrics collector to gather and\nanalyze metrics from the Tendermint node.")]),e._v(" "),o("h2",{attrs:{id:"debugging-a-single-node"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#debugging-a-single-node"}},[e._v("#")]),e._v(" Debugging a Single Node")]),e._v(" "),o("p",[e._v("If you observe that a single validator is frequently failing to produce blocks or\nvoting nil for proposals that other validators vote for and suspect it may be\nrelated to clock synchronization, use the following steps to debug and correct the issue.")]),e._v(" "),o("h3",{attrs:{id:"check-timely-metric"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#check-timely-metric"}},[e._v("#")]),e._v(" Check Timely Metric")]),e._v(" "),o("p",[e._v("Tendermint exposes a histogram metric for the difference between the timestamp in the proposal\nthe and the time read from the node's local clock when the proposal is received.")]),e._v(" "),o("p",[e._v("The histogram exposes multiple metrics on the Prometheus "),o("code",[e._v("/metrics")]),e._v(" endpoint called")]),e._v(" "),o("ul",[o("li",[o("code",[e._v("tendermint_consensus_proposal_timestamp_difference_bucket")]),e._v(".")]),e._v(" "),o("li",[o("code",[e._v("tendermint_consensus_proposal_timestamp_difference_sum")]),e._v(".")]),e._v(" "),o("li",[o("code",[e._v("tendermint_consensus_proposal_timestamp_difference_count")]),e._v(".")])]),e._v(" "),o("p",[e._v("Each metric is also labeled with the key "),o("code",[e._v("is_timely")]),e._v(", which can have a value of\n"),o("code",[e._v("true")]),e._v(" or "),o("code",[e._v("false")]),e._v(".")]),e._v(" "),o("h4",{attrs:{id:"from-the-prometheus-collector-ui"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#from-the-prometheus-collector-ui"}},[e._v("#")]),e._v(" From the Prometheus Collector UI")]),e._v(" "),o("p",[e._v("If you are running a Prometheus collector, navigate to the query web interface and select the 'Graph' tab.")]),e._v(" "),o("p",[e._v("Issue a query for the following:")]),e._v(" "),o("tm-code-block",{staticClass:"codeblock",attrs:{language:"",base64:"dGVuZGVybWludF9jb25zZW5zdXNfcHJvcG9zYWxfdGltZXN0YW1wX2RpZmZlcmVuY2VfY291bnR7aXNfdGltZWx5PSZxdW90O2ZhbHNlJnF1b3Q7fSAvCnRlbmRlcm1pbnRfY29uc2Vuc3VzX3Byb3Bvc2FsX3RpbWVzdGFtcF9kaWZmZXJlbmNlX2NvdW50e2lzX3RpbWVseT0mcXVvdDt0cnVlJnF1b3Q7fQo="}}),e._v(" "),o("p",[e._v("This query will graph the ratio of proposals the node considered timely to those it\nconsidered untimely. If the ratio is increasing, it means that your node is consistently\nseeing more proposals that are far from its local clock. If this is the case, you should\ncheck to make sure your local clock is properly synchronized to NTP.")]),e._v(" "),o("h4",{attrs:{id:"from-the-metrics-url"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#from-the-metrics-url"}},[e._v("#")]),e._v(" From the "),o("code",[e._v("/metrics")]),e._v(" url")]),e._v(" "),o("p",[e._v("If you are not running a Prometheus collector, navigate to the "),o("code",[e._v("/metrics")]),e._v(" endpoint\nexposed on the Prometheus metrics port with "),o("code",[e._v("curl")]),e._v(" or a browser.")]),e._v(" "),o("p",[e._v("Search for the "),o("code",[e._v("tendermint_consensus_proposal_timestamp_difference_count")]),e._v(" metrics.\nThis metric is labeled with "),o("code",[e._v("is_timely")]),e._v(". Investigate the value of\n"),o("code",[e._v("tendermint_consensus_proposal_timestamp_difference_count")]),e._v(" where "),o("code",[e._v('is_timely="false"')]),e._v("\nand where "),o("code",[e._v('is_timely="true"')]),e._v(". Refresh the endpoint and observe if the value of "),o("code",[e._v('is_timely="false"')]),e._v("\nis growing.")]),e._v(" "),o("p",[e._v("If you observe that "),o("code",[e._v('is_timely="false"')]),e._v(" is growing, it means that your node is consistently\nseeing proposals that are far from its local clock. If this is the case, you should check\nto make sure your local clock is properly synchronized to NTP.")]),e._v(" "),o("h3",{attrs:{id:"checking-clock-sync"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#checking-clock-sync"}},[e._v("#")]),e._v(" Checking Clock Sync")]),e._v(" "),o("p",[e._v("NTP configuration and tooling is very specific to the operating system and distribution\nthat your validator node is running. This guide assumes you have "),o("code",[e._v("timedatectl")]),e._v(" installed with\n"),o("a",{attrs:{href:"https://chrony.tuxfamily.org/",target:"_blank",rel:"noopener noreferrer"}},[e._v("chrony"),o("OutboundLink")],1),e._v(", a popular tool for interacting with time\nsynchronization on Linux distributions. If you are using an operating system or\ndistribution with a different time synchronization mechanism, please consult the\ndocumentation for your operating system to check the status and re-synchronize the daemon.")]),e._v(" "),o("h4",{attrs:{id:"check-if-ntp-is-enabled"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#check-if-ntp-is-enabled"}},[e._v("#")]),e._v(" Check if NTP is Enabled")]),e._v(" "),o("tm-code-block",{staticClass:"codeblock",attrs:{language:"shell",base64:"JCB0aW1lZGF0ZWN0bAo="}}),e._v(" "),o("p",[e._v("From the output, ensure that "),o("code",[e._v("NTP service")]),e._v(" is "),o("code",[e._v("active")]),e._v(". If "),o("code",[e._v("NTP service")]),e._v(" is "),o("code",[e._v("inactive")]),e._v(", run:")]),e._v(" "),o("tm-code-block",{staticClass:"codeblock",attrs:{language:"shell",base64:"JCB0aW1lZGF0ZWN0bCBzZXQtbnRwIHRydWUK"}}),e._v(" "),o("p",[e._v("Re-run the "),o("code",[e._v("timedatectl")]),e._v(" command and verify that the change has taken effect.")]),e._v(" "),o("h4",{attrs:{id:"check-if-your-ntp-daemon-is-synchronized"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#check-if-your-ntp-daemon-is-synchronized"}},[e._v("#")]),e._v(" Check if Your NTP Daemon is Synchronized")]),e._v(" "),o("p",[e._v("Check the status of your local "),o("code",[e._v("chrony")]),e._v(" NTP daemon using by running the following:")]),e._v(" "),o("tm-code-block",{staticClass:"codeblock",attrs:{language:"shell",base64:"JCBjaHJvbnljIHRyYWNraW5nCg=="}}),e._v(" "),o("p",[e._v("If the "),o("code",[e._v("chrony")]),e._v(" daemon is running, you will see output that indicates its current status.\nIf the "),o("code",[e._v("chrony")]),e._v(" daemon is not running, restart it and re-run "),o("code",[e._v("chronyc tracking")]),e._v(".")]),e._v(" "),o("p",[e._v("The "),o("code",[e._v("System time")]),e._v(" field of the response should show a value that is much smaller than 100\nmilliseconds.")]),e._v(" "),o("p",[e._v("If the value is very large, restart the "),o("code",[e._v("chronyd")]),e._v(" daemon.")]),e._v(" "),o("h2",{attrs:{id:"debugging-a-network"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#debugging-a-network"}},[e._v("#")]),e._v(" Debugging a Network")]),e._v(" "),o("p",[e._v("If you observe that a network is frequently failing to produce blocks and suspect\nit may be related to clock synchronization, use the following steps to debug and correct the issue.")]),e._v(" "),o("h3",{attrs:{id:"check-prevote-message-delay"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#check-prevote-message-delay"}},[e._v("#")]),e._v(" Check Prevote Message Delay")]),e._v(" "),o("p",[e._v("Tendermint exposes metrics that help determine how synchronized the clocks on a network are.")]),e._v(" "),o("p",[e._v("These metrics are visible on the Prometheus "),o("code",[e._v("/metrics")]),e._v(" endpoint and are called:")]),e._v(" "),o("ul",[o("li",[o("code",[e._v("tendermint_consensus_quorum_prevote_delay")])]),e._v(" "),o("li",[o("code",[e._v("tendermint_consensus_full_prevote_delay")])])]),e._v(" "),o("p",[e._v("These metrics calculate the difference between the timestamp in the proposal message and\nthe timestamp of a prevote that was issued during consensus.")]),e._v(" "),o("p",[e._v("The "),o("code",[e._v("tendermint_consensus_quorum_prevote_delay")]),e._v(" metric is the interval in seconds\nbetween the proposal timestamp and the timestamp of the earliest prevote that\nachieved a quorum during the prevote step.")]),e._v(" "),o("p",[e._v("The "),o("code",[e._v("tendermint_consensus_full_prevote_delay")]),e._v(" metric is the interval in seconds\nbetween the proposal timestamp and the timestamp of the latest prevote in a round\nwhere 100% of the validators voted.")]),e._v(" "),o("h4",{attrs:{id:"from-the-prometheus-collector-ui-2"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#from-the-prometheus-collector-ui-2"}},[e._v("#")]),e._v(" From the Prometheus Collector UI")]),e._v(" "),o("p",[e._v("If you are running a Prometheus collector, navigate to the query web interface and select the 'Graph' tab.")]),e._v(" "),o("p",[e._v("Issue a query for the following:")]),e._v(" "),o("tm-code-block",{staticClass:"codeblock",attrs:{language:"",base64:"c3VtKHRlbmRlcm1pbnRfY29uc2Vuc3VzX3F1b3J1bV9wcmV2b3RlX2RlbGF5KSBieSAocHJvcG9zZXJfYWRkcmVzcykK"}}),e._v(" "),o("p",[e._v("This query will graph the difference in seconds for each proposer on the network.")]),e._v(" "),o("p",[e._v("If the value is much larger for some proposers, then the issue is likely related to the clock\nsynchronization of their nodes. Contact those proposers and ensure that their nodes\nare properly connected to NTP using the steps for "),o("a",{attrs:{href:"#debugging-a-single-node"}},[e._v("Debugging a Single Node")]),e._v(".")]),e._v(" "),o("p",[e._v("If the value is relatively similar for all proposers you should next compare this\nvalue to the "),o("code",[e._v("SynchronyParams")]),e._v(" values for the network. Continue to the "),o("a",{attrs:{href:"#checking-synchrony"}},[e._v("Checking\nSychrony")]),e._v(" steps.")]),e._v(" "),o("h4",{attrs:{id:"from-the-metrics-url-2"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#from-the-metrics-url-2"}},[e._v("#")]),e._v(" From the "),o("code",[e._v("/metrics")]),e._v(" url")]),e._v(" "),o("p",[e._v("If you are not running a Prometheus collector, navigate to the "),o("code",[e._v("/metrics")]),e._v(" endpoint\nexposed on the Prometheus metrics port.")]),e._v(" "),o("p",[e._v("Search for the "),o("code",[e._v("tendermint_consensus_quorum_prevote_delay")]),e._v(" metric. There will be one\nentry of this metric for each "),o("code",[e._v("proposer_address")]),e._v(". If the value of this metric is\nmuch larger for some proposers, then the issue is likely related to synchronization of their\nnodes with NTP. Contact those proposers and ensure that their nodes are properly connected\nto NTP using the steps for "),o("a",{attrs:{href:"#debugging-a-single-node"}},[e._v("Debugging a Single Node")]),e._v(".")]),e._v(" "),o("p",[e._v("If the values are relatively similar for all proposers you should next compare,\nyou'll need to compare this value to the "),o("code",[e._v("SynchronyParams")]),e._v(" for the network. Continue\nto the "),o("a",{attrs:{href:"#checking-synchrony"}},[e._v("Checking Sychrony")]),e._v(" steps.")]),e._v(" "),o("h3",{attrs:{id:"checking-synchrony"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#checking-synchrony"}},[e._v("#")]),e._v(" Checking Synchrony")]),e._v(" "),o("p",[e._v("To determine the currently configured "),o("code",[e._v("SynchronyParams")]),e._v(" for your network, issue a\nrequest to your node's RPC endpoint. For a node running locally with the RPC server\nexposed on port "),o("code",[e._v("26657")]),e._v(", run the following command:")]),e._v(" "),o("tm-code-block",{staticClass:"codeblock",attrs:{language:"shell",base64:"JCBjdXJsIGxvY2FsaG9zdDoyNjY1Ny9jb25zZW5zdXNfcGFyYW1zCg=="}}),e._v(" "),o("p",[e._v("The json output will contain a field named "),o("code",[e._v("synchrony")]),e._v(", with the following structure:")]),e._v(" "),o("tm-code-block",{staticClass:"codeblock",attrs:{language:"json",base64:"ewogICZxdW90O3ByZWNpc2lvbiZxdW90OzogJnF1b3Q7NTAwMDAwMDAwJnF1b3Q7LAogICZxdW90O21lc3NhZ2VfZGVsYXkmcXVvdDs6ICZxdW90OzMwMDAwMDAwMDAmcXVvdDsKfQo="}}),e._v(" "),o("p",[e._v("The "),o("code",[e._v("precision")]),e._v(" and "),o("code",[e._v("message_delay")]),e._v(" values returned are listed in nanoseconds:\nIn the examples above, the precision is 500ms and the message delay is 3s.\nRemember, "),o("code",[e._v("tendermint_consensus_quorum_prevote_delay")]),e._v(" is listed in seconds.\nIf the "),o("code",[e._v("tendermint_consensus_quorum_prevote_delay")]),e._v(" value approaches the sum of "),o("code",[e._v("precision")]),e._v(" and "),o("code",[e._v("message_delay")]),e._v(",\nthen the value selected for these parameters is too small. Your application will\nneed to be modified to update the "),o("code",[e._v("SynchronyParams")]),e._v(" to have larger values.")]),e._v(" "),o("h3",{attrs:{id:"updating-synchronyparams"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#updating-synchronyparams"}},[e._v("#")]),e._v(" Updating SynchronyParams")]),e._v(" "),o("p",[e._v("The "),o("code",[e._v("SynchronyParams")]),e._v(" are "),o("code",[e._v("ConsensusParameters")]),e._v(" which means they are set and updated\nby the application running alongside Tendermint. Updates to these parameters must\nbe passed to the application during the "),o("code",[e._v("FinalizeBlock")]),e._v(" ABCI method call.")]),e._v(" "),o("p",[e._v("If the application was built using the CosmosSDK, then these parameters can be updated\nprogramatically using a governance proposal. For more information, see the "),o("a",{attrs:{href:"https://hub.cosmos.network/main/governance/submitting.html#sending-the-transaction-that-submits-your-governance-proposal",target:"_blank",rel:"noopener noreferrer"}},[e._v("CosmosSDK\ndocumentation"),o("OutboundLink")],1),e._v(".")]),e._v(" "),o("p",[e._v("If the application does not implement a way to update the consensus parameters\nprogramatically, then the application itself must be updated to do so. More information on updating\nthe consensus parameters via ABCI can be found in the "),o("RouterLink",{attrs:{to:"/spec/abci++/abci%2B%2B_methods.html#finalizeblock"}},[e._v("FinalizeBlock documentation")]),e._v(".")],1)],1)}),[],!1,null,null,null);t.default=s.exports}}]);