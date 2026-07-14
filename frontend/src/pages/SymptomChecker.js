import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaStethoscope,
  FaRobot,
  FaExclamationTriangle,
  FaUserMd,
  FaLightbulb,
  FaArrowRight
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useTheme } from '../context/ThemeContext';
import { toast } from 'react-toastify';
import axios from "axios";


const SymptomChecker = () => {

  const { isDark } = useTheme();
  const navigate = useNavigate();

  const [symptoms, setSymptoms] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);


  const handleAnalyze = async () => {

    if (!symptoms.trim()) {
      toast.error("Please enter your symptoms");
      return;
    }


    setIsLoading(true);


    try {

      const token = localStorage.getItem("token");


      const response = await axios.post(
        "http://localhost:8080/api/ai/analyze-symptoms",
        {
          symptoms: symptoms
        },
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );


      console.log("Raw response:", response.data);

      // Extract analysis from response
      let analysis = response.data.analysis;
      
      // First parse: analysis might be a string
      if (typeof analysis === "string") {
        try {
          analysis = JSON.parse(analysis);
        } catch (e) {
          console.error("First parse failed:", e);
          throw new Error("Failed to parse analysis response");
        }
      }

      console.log("After first parse:", analysis);

      // Extract text from Gemini response structure
      let aiText;
      try {
        aiText = analysis?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!aiText) {
          throw new Error("No text found in Gemini response");
        }
      } catch (e) {
        console.error("Failed to extract text:", e);
        throw new Error("Invalid Gemini response structure");
      }

      console.log("Extracted AI text:", aiText);

      // Second parse: parse the actual JSON data
      let aiData;
      try {
        aiData = JSON.parse(aiText);
      } catch (e) {
        console.error("Second parse failed:", e);
        // Try to extract JSON if it's wrapped in markdown code blocks
        const jsonMatch = aiText.match(/```json\s*([\s\S]*?)\s*```/) || aiText.match(/```\s*([\s\S]*?)\s*```/);
        if (jsonMatch) {
          aiData = JSON.parse(jsonMatch[1]);
        } else {
          throw new Error("Failed to parse AI response JSON");
        }
      }

      console.log("Final AI Data:", aiData);



      setResult({

        symptomsSummary: symptoms,


        possibleConditions:
          aiData.possibleConditions || [],


        urgencyLevel:
          aiData.urgencyLevel || "Unknown",


        suggestedDepartment:
          aiData.suggestedDepartment || "General Physician",


        selfCareTips:
          aiData.selfCareTips || [],


        doctorRecommendation:
          aiData.doctorRecommendation ||
          "Consult a doctor if symptoms worsen."

      });


    } 
    catch(error){

      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Unable to analyze symptoms."
      );

    } 
    finally{

      setIsLoading(false);

    }

  };



  const getUrgencyColor = (level)=>{

    switch(level){

      case "Emergency":
        return "bg-red-500";

      case "High":
        return "bg-orange-500";

      case "Medium":
        return "bg-yellow-500";

      case "Low":
        return "bg-green-500";

      default:
        return "bg-gray-500";
    }

  };


return (
<div className={`min-h-screen flex ${isDark ? 'dark':''}`}>

<Sidebar/>

<main className="flex-1 lg:ml-72 p-4 lg:p-8">

<div className="max-w-4xl mx-auto">


<motion.div
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
className="mb-8"
>

<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
AI Symptom Checker
</h1>


<p className="text-gray-600 dark:text-gray-400">
Describe your symptoms and get preliminary health guidance
</p>


</motion.div>
<motion.div
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 mb-6"
>

<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
Describe Your Symptoms
</label>


<textarea
value={symptoms}
onChange={(e)=>setSymptoms(e.target.value)}
placeholder="e.g., fever, headache, cough..."
rows="5"
className="w-full px-4 py-3 border rounded-xl dark:bg-slate-700 dark:text-white"
/>


<button
onClick={handleAnalyze}
disabled={isLoading}
className="mt-4 w-full py-3 bg-primary-600 text-white rounded-xl"
>

{
isLoading
?
"Analyzing..."
:
<>
<FaRobot/> Analyze Symptoms
</>
}

</button>


</motion.div>



{
result &&

<motion.div
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
className="space-y-6"
>


{/* Urgency */}

<div className={`${getUrgencyColor(result.urgencyLevel)} rounded-2xl p-6 text-white`}>

<div className="flex items-center space-x-3">

<FaExclamationTriangle/>

<h3 className="text-xl font-semibold">
Urgency Level: {result.urgencyLevel}
</h3>

</div>

</div>




{/* Summary */}

<div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow">


<h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-3">

<FaStethoscope className="inline mr-2"/>

Symptoms Summary

</h3>


<p className="text-gray-700 dark:text-gray-300">

{result.symptomsSummary}

</p>


</div>





{/* Conditions */}

<div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow">


<h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">

Possible Conditions

</h3>



<div className="space-y-2">


{
result.possibleConditions?.length > 0 ?

result.possibleConditions.map((condition,index)=>(


<div
key={index}
className="p-3 bg-gray-50 dark:bg-slate-700 rounded-xl"
>

<span>
✓ {condition}
</span>


</div>


))


:

<p className="text-gray-500">
No conditions available
</p>

}



</div>

</div>







{/* Department */}

<div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow">


<h3 className="font-semibold text-lg text-gray-900 dark:text-white">

<FaUserMd className="inline mr-2"/>

Suggested Department

</h3>


<p className="text-primary-600 font-semibold mt-3">

{result.suggestedDepartment}

</p>


</div>







{/* Self Care */}

<div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow">


<h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">

<FaLightbulb className="inline mr-2"/>

Self-Care Tips

</h3>


<ul className="space-y-2">


{

result.selfCareTips?.length > 0 ?

result.selfCareTips.map((tip,index)=>(


<li
key={index}
className="text-gray-700 dark:text-gray-300"
>

✓ {tip}

</li>


))


:

<li>
No self-care tips available
</li>


}



</ul>


</div>







{/* Doctor Recommendation */}


<div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-6 text-white">


<h3 className="text-lg font-semibold mb-3">

Doctor Recommendation

</h3>


<p>

{result.doctorRecommendation}

</p>



<button
onClick={()=>navigate('/appointments')}
className="mt-5 bg-white text-primary-600 px-6 py-3 rounded-xl"
>

Book Appointment <FaArrowRight className="inline"/>

</button>


</div>





{/* Disclaimer */}

<div className="bg-yellow-50 rounded-2xl p-6">


<h3 className="font-semibold text-yellow-700">

Medical Disclaimer

</h3>


<p className="text-sm mt-2">

This symptom checker provides educational guidance only.
Always consult a qualified healthcare professional.

</p>


</div>




</motion.div>


}



</div>

</main>


</div>

);


};


export default SymptomChecker;