// hooks/useExplanations.js
import { useState, useEffect } from "react";
import {
  getCompanyScoreExplanation,
  getCompanyInfo,
  getCompanyScore,
} from "@/api/api";

export const useCompanyInfo = ({ idCompany }: { idCompany: number }) => {
  // Information States
  const [explanation, setExplanation] = useState({});
  const [companyInfo, setCompanyInfo] = useState({});
  const [companyScore, setCompanyScore] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanyExplanation = async () => {
      try {
        // Company Basic Information
        const responseCompanyInfo = await getCompanyInfo(idCompany);
        setCompanyInfo(responseCompanyInfo.data);

        // Company Score
        const responseCompanyScore = await getCompanyScore(idCompany);
        setCompanyScore(responseCompanyScore.data);

        // Company Score Explanation
        const responseScoreExplanation = await getCompanyScoreExplanation(
          idCompany
        );
        setExplanation(responseScoreExplanation.data);
      } catch (err) {
        // @ts-expect-error cosas varias
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyExplanation();
  }, [idCompany]);

  return { explanation, companyInfo, companyScore, loading, error };
};
