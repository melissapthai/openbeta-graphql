import { gql } from 'apollo-server'

const HistoryTypeDefs = gql`
  input AllHistoryFilter {
    uuidList: [ID]
    userUuid: ID
    fromDate: Date
    toDate: Date
  }

  input AreaHistoryFilter {
    areaId: ID
  }

  type UpdateDescription {
    updatedFields: [String]
  }

  type Change {
    changeId: ID!
    dbOp: String!
    fullDocument: Document
    updateDescription: UpdateDescription
  }

  union Document = Area | Climb

  type History {
    id: ID!
    editedBy: String!
    operation: String!
    createdAt: Date!
    changes: [Change]
  }

  type Query {
    getChangeHistory(filter: AllHistoryFilter): [History]
    getAreaHistory(filter: AreaHistoryFilter): [History]
  }
`

export default HistoryTypeDefs