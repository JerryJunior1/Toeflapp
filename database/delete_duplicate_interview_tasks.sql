DELETE FROM public.interview_tasks
WHERE id IN (
  SELECT id
  FROM (
    SELECT id,
           ROW_NUMBER() OVER (PARTITION BY task_title ORDER BY id) as row_num
    FROM public.interview_tasks
  ) t
  WHERE t.row_num > 1
);
