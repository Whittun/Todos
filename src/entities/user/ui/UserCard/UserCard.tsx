import type { User } from "../../model/types";
import styles from "./UserCard.module.css";

type UserCardProps = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
};

const getInitials = (name: string) => {
  return name
    .split(" ")
    .slice(0, 2)
    .map((namePart) => namePart[0])
    .join("")
    .toUpperCase();
};

export const UserCard = ({ user, isLoading, error }: UserCardProps) => {
  if (isLoading) {
    return (
      <section className={styles.card}>
        <h4 className={styles.title}>Исполнитель</h4>
        <div className={styles.state}>Загрузка пользователя...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.card}>
        <h4 className={styles.title}>Исполнитель</h4>
        <div className={styles.error}>{error}</div>
      </section>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <section className={styles.card}>
      <h4 className={styles.title}>Исполнитель</h4>
      <div className={styles.profile}>
        <span className={styles.avatar} aria-hidden="true">
          {getInitials(user.name)}
        </span>
        <div className={styles.info}>
          <p className={styles.name}>{user.name}</p>
          <a className={styles.email} href={`mailto:${user.email}`}>
            {user.email}
          </a>
        </div>
      </div>
    </section>
  );
};
