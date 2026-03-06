import Link from "next/link";

export function GetMatchedBanner() {
  return (
    <div className="col-span-full rounded-lg border-2 border-blue-200 bg-blue-50 p-6">
      <p className="text-center text-gray-800">
        Vous n'arrivez pas à choisir ? Laissez Jared vous guider.
      </p>
      <div className="mt-4 flex justify-center">
        <Link
          href="/trouver-mon-conseiller"
          className="btn-primary inline-block px-6 py-3"
        >
          Trouver mon conseiller
        </Link>
      </div>
    </div>
  );
}
