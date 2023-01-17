import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import selectors from '../selectors';
import entryActions from '../entry-actions';
import { BoardMembershipRoles } from '../constants/Enums';
import BoardActions from '../components/BoardActions';

const mapStateToProps = (state) => {
  const listIds = selectors.selectListIdsForCurrentBoard(state);
  const listCardsCount = listIds.map((list) => selectors.selectCardIdsByListId(state, list).length);
  const cardCount = listCardsCount.reduce((sum, count) => sum + count, 0);
  const allUsers = selectors.selectUsers(state);
  const isCurrentUserManager = selectors.selectIsCurrentUserManagerForCurrentProject(state);
  const memberships = selectors.selectMembershipsForCurrentBoard(state);
  const labels = selectors.selectLabelsForCurrentBoard(state);
  const filterUsers = selectors.selectFilterUsersForCurrentBoard(state);
  const filterLabels = selectors.selectFilterLabelsForCurrentBoard(state);
  const currentUserMembership = selectors.selectCurrentUserMembershipForCurrentBoard(state);

  const isCurrentUserEditor =
    !!currentUserMembership && currentUserMembership.role === BoardMembershipRoles.EDITOR;

  return {
    cardCount,
    memberships,
    labels,
    filterUsers,
    filterLabels,
    allUsers,
    canEdit: isCurrentUserEditor,
    canEditMemberships: isCurrentUserManager,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      onMembershipCreate: entryActions.createMembershipInCurrentBoard,
      onMembershipUpdate: entryActions.updateBoardMembership,
      onMembershipDelete: entryActions.deleteBoardMembership,
      onUserToFilterAdd: entryActions.addUserToFilterInCurrentBoard,
      onUserFromFilterRemove: entryActions.removeUserFromFilterInCurrentBoard,
      onLabelToFilterAdd: entryActions.addLabelToFilterInCurrentBoard,
      onLabelFromFilterRemove: entryActions.removeLabelFromFilterInCurrentBoard,
      onLabelCreate: entryActions.createLabelInCurrentBoard,
      onLabelUpdate: entryActions.updateLabel,
      onLabelMove: entryActions.moveLabel,
      onLabelDelete: entryActions.deleteLabel,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(BoardActions);
