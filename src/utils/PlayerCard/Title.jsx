import React, { useEffect, useRef, useState } from "react";
import styles from "./Title.module.css";

export const Title = ({ title }) => {
  return (
    <div>
      <h1 className={styles.title}>{title}</h1>
    </div>
  );
};
