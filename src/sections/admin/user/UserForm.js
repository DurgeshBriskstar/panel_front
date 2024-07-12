import UserAccount from "../setting/setting-window/section/UserAccount";

export default function UserForm({ isEdit, user }) {
  return (
    <UserAccount isEdit={isEdit} user={user} />
  );
}
