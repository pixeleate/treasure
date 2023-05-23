import gql from 'graphql-tag';

export const InventoryByAddress = gql`
  query InventoryByAddress($address: String!) {
    punks(where: { owner: $address }) {
      id
      tokenId
      transferedTo {
        id
      }
      assignedTo {
        id
      }
      purchasedBy {
        id
      }
      metadata {
        image
        svg
      }
    }
  }
`;
